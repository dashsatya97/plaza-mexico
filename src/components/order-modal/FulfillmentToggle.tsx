import { Store, Truck } from "lucide-react";
import { ordering } from "../../data/restaurant";
import type { Fulfillment } from "./types";

type FulfillmentToggleProps = {
  fulfillment: Fulfillment;
  onChange: (value: Fulfillment) => void;
};

const options = [
  {
    value: "pickup" as const,
    icon: Store,
    title: "Pickup",
    desc: `Ready in ${ordering.pickupEstimate}`,
  },
  {
    value: "delivery" as const,
    icon: Truck,
    title: "Delivery",
    desc: `Approx. ${ordering.deliveryEstimate}`,
  },
];

export default function FulfillmentToggle({
  fulfillment,
  onChange,
}: FulfillmentToggleProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
        How would you like your order?
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const active = fulfillment === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-start gap-1 rounded-xl border p-4 min-h-[4.5rem] text-left transition-all ${
                active
                  ? "border-primary-500 bg-primary-50 ring-1 ring-primary-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-pressed={active}
            >
              <Icon
                size={22}
                className={active ? "text-primary-500" : "text-gray-400"}
              />
              <span className="font-semibold text-gray-900 text-sm">
                {option.title}
              </span>
              <span className="text-xs text-gray-500">{option.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
