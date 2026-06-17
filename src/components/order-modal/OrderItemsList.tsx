import { ShoppingBag, Info } from "lucide-react";
import { formatPrice } from "../../utils/format";
import type { MenuItem } from "../../data/restaurant";
import type { Step } from "./types";

type OrderItemsListProps = {
  step: Step;
  orderItems: MenuItem[];
  quantities: Record<number, number>;
  hasItems: boolean;
  itemCount: number;
};

export default function OrderItemsList({
  step,
  orderItems,
  quantities,
  hasItems,
  itemCount,
}: OrderItemsListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          {step === "menu" ? "Your order" : "Order summary"}
        </h3>
        {hasItems && (
          <span className="text-xs font-medium text-gray-500">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {!hasItems ? (
        <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
          <ShoppingBag size={32} className="mb-2 opacity-40" />
          <p className="text-sm">No items selected yet. Use + to add items.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {orderItems.map((item) => {
            const qty = quantities[item.id];
            const lineTotal = item.price * qty;

            return (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-gray-400">
                    {formatPrice(item.price)} x {qty}
                  </p>
                </div>
                <span className="font-semibold text-gray-900 tabular-nums shrink-0">
                  {formatPrice(lineTotal)}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {step === "review" && hasItems && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary-50 p-3 text-sm text-primary-700">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>
            No payment is collected online. Your total includes tax — you&apos;ll
            confirm and pay when we call you back.
          </p>
        </div>
      )}
    </div>
  );
}
