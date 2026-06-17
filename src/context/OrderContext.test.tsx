import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { OrderProvider, useOrder } from "./OrderContext";
import { menuItems } from "../data/restaurant";

const wrapper = ({ children }: { children: ReactNode }) => (
  <OrderProvider>{children}</OrderProvider>
);

describe("OrderContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds items and derives count and subtotal", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });

    act(() => {
      result.current.addItem(menuItems[0].id, 2);
      result.current.addItem(menuItems[1].id, 1);
    });

    expect(result.current.totalCount).toBe(3);
    expect(result.current.subtotal).toBeCloseTo(
      menuItems[0].price * 2 + menuItems[1].price,
      5,
    );
  });

  it("removes an item when quantity drops to zero", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });

    act(() => {
      result.current.addItem(menuItems[0].id, 1);
      result.current.addItem(menuItems[0].id, -1);
    });

    expect(result.current.quantities[menuItems[0].id]).toBeUndefined();
    expect(result.current.totalCount).toBe(0);
  });

  it("setItem overrides quantity and clearCart empties it", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });

    act(() => {
      result.current.setItem(menuItems[0].id, 5);
    });
    expect(result.current.quantities[menuItems[0].id]).toBe(5);

    act(() => {
      result.current.clearCart();
    });
    expect(result.current.totalCount).toBe(0);
  });

  it("persists the cart to localStorage", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });

    act(() => {
      result.current.addItem(menuItems[0].id, 2);
    });

    const stored = JSON.parse(
      window.localStorage.getItem("plaza-mexico-cart") ?? "{}",
    );
    expect(stored[menuItems[0].id]).toBe(2);
  });

  it("hydrates the cart from localStorage", () => {
    window.localStorage.setItem(
      "plaza-mexico-cart",
      JSON.stringify({ [menuItems[0].id]: 3 }),
    );

    const { result } = renderHook(() => useOrder(), { wrapper });
    expect(result.current.totalCount).toBe(3);
  });

  it("toggles the modal open state", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });

    expect(result.current.isModalOpen).toBe(false);
    act(() => result.current.openOrder());
    expect(result.current.isModalOpen).toBe(true);
    act(() => result.current.closeOrder());
    expect(result.current.isModalOpen).toBe(false);
  });

  it("shows a toast and clears it after a delay", () => {
    vi.useFakeTimers();
    try {
      const { result } = renderHook(() => useOrder(), { wrapper });

      act(() => result.current.showToast("Added to order"));
      expect(result.current.toast).toBe("Added to order");

      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(result.current.toast).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});

afterEach(() => {
  window.localStorage.clear();
});
