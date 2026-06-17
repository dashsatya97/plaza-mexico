import { ArrowLeft } from "lucide-react";
import OrderItemsList from "./OrderItemsList";
import OrderTotalsActions from "./OrderTotalsActions";
import type { MenuItem } from "../../data/restaurant";
import type { Step } from "./types";

type OrderSummaryPanelProps = {
  step: Step;
  orderItems: MenuItem[];
  quantities: Record<number, number>;
  hasItems: boolean;
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  isDelivery: boolean;
  belowDeliveryMinimum: boolean;
  onBack: () => void;
  onReview: () => void;
  onContinueToDetails: () => void;
  onPlaceOrder: () => void;
};

export default function OrderSummaryPanel({
  step,
  orderItems,
  quantities,
  hasItems,
  itemCount,
  subtotal,
  tax,
  deliveryFee,
  total,
  isDelivery,
  belowDeliveryMinimum,
  onBack,
  onReview,
  onContinueToDetails,
  onPlaceOrder,
}: OrderSummaryPanelProps) {
  return (
    <div
      className={`flex flex-col bg-gray-50 shrink-0 min-h-0 ${
        step === "review"
          ? "flex-1"
          : "w-full md:w-[340px] lg:w-[380px]"
      } ${
        step === "menu"
          ? "border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] md:border-t-0 md:shadow-none"
          : ""
      }`}
    >
      {step !== "menu" && (
        <div className="px-4 sm:px-6 pt-4 shrink-0">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft size={16} />
            {step === "details" ? "Back to review" : "Back to menu"}
          </button>
        </div>
      )}

      <OrderItemsList
        step={step}
        orderItems={orderItems}
        quantities={quantities}
        hasItems={hasItems}
        itemCount={itemCount}
      />

      <OrderTotalsActions
        step={step}
        subtotal={subtotal}
        tax={tax}
        deliveryFee={deliveryFee}
        total={total}
        isDelivery={isDelivery}
        hasItems={hasItems}
        belowDeliveryMinimum={belowDeliveryMinimum}
        onReview={onReview}
        onContinueToDetails={onContinueToDetails}
        onPlaceOrder={onPlaceOrder}
      />
    </div>
  );
}
