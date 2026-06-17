import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { menuItems } from "../data/restaurant";

type Quantities = Record<number, number>;

type OrderContextValue = {
  /** Map of menu item id -> quantity in the cart. */
  quantities: Quantities;
  /** Add (or subtract with a negative delta) a quantity for an item. */
  addItem: (id: number, delta?: number) => void;
  /** Set an exact quantity for an item (0 removes it). */
  setItem: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isModalOpen: boolean;
  openOrder: () => void;
  closeOrder: () => void;
  toast: string | null;
  showToast: (message: string) => void;
};

const STORAGE_KEY = "plaza-mexico-cart";

const noop = () => {};

// A fully-formed default keeps components renderable in isolation (e.g. unit
// tests) without forcing every tree to be wrapped in a provider.
const defaultValue: OrderContextValue = {
  quantities: {},
  addItem: noop,
  setItem: noop,
  removeItem: noop,
  clearCart: noop,
  totalCount: 0,
  subtotal: 0,
  isModalOpen: false,
  openOrder: noop,
  closeOrder: noop,
  toast: null,
  showToast: noop,
};

const OrderContext = createContext<OrderContextValue>(defaultValue);

const readStoredCart = (): Quantities => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Quantities) : {};
  } catch {
    return {};
  }
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>(readStoredCart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      // Storage can be unavailable (private mode / quota) — fail silently.
    }
  }, [quantities]);

  const addItem = useCallback((id: number, delta = 1) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      if (next === 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: next };
    });
  }, []);

  const setItem = useCallback((id: number, qty: number) => {
    setQuantities((prev) => {
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: qty };
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => setQuantities({}), []);

  const openOrder = useCallback(() => setIsModalOpen(true), []);
  const closeOrder = useCallback(() => setIsModalOpen(false), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const { totalCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of menuItems) {
      const qty = quantities[item.id] ?? 0;
      count += qty;
      sum += qty * item.price;
    }
    return { totalCount: count, subtotal: sum };
  }, [quantities]);

  const value = useMemo<OrderContextValue>(
    () => ({
      quantities,
      addItem,
      setItem,
      removeItem,
      clearCart,
      totalCount,
      subtotal,
      isModalOpen,
      openOrder,
      closeOrder,
      toast,
      showToast,
    }),
    [
      quantities,
      addItem,
      setItem,
      removeItem,
      clearCart,
      totalCount,
      subtotal,
      isModalOpen,
      openOrder,
      closeOrder,
      toast,
      showToast,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrder() {
  return useContext(OrderContext);
}
