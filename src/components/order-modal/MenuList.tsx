import { Minus, Plus } from "lucide-react";
import { menuItems } from "../../data/restaurant";
import { formatPrice } from "../../utils/format";

type MenuListProps = {
  quantities: Record<number, number>;
  updateQuantity: (id: number, delta: number) => void;
};

export default function MenuList({ quantities, updateQuantity }: MenuListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 md:border-r border-gray-100 max-h-[42dvh] md:max-h-none">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
        Menu Items
      </h3>
      <div className="space-y-2">
        {menuItems.map((item) => {
          const qty = quantities[item.id] ?? 0;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                qty > 0
                  ? "bg-primary-50 ring-1 ring-primary-200"
                  : "bg-gray-50 hover:bg-gray-100/80"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500 truncate">{item.category}</p>
                <p className="text-sm text-primary-500 font-semibold">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={qty === 0}
                  className="touch-target rounded-lg border border-gray-200 text-gray-600 hover:bg-white hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200 disabled:hover:text-gray-600"
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-semibold text-gray-900 tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="touch-target rounded-lg border border-gray-200 text-gray-600 hover:bg-white hover:border-primary-500 hover:text-primary-500 transition-colors"
                  aria-label={`Increase ${item.name} quantity`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
