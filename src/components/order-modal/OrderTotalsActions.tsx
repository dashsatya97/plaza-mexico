import {
  Phone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { business, ordering, taxRate } from "../../data/restaurant";
import { formatPrice } from "../../utils/format";
import type { Step } from "./types";

type OrderTotalsActionsProps = {
  step: Step;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  isDelivery: boolean;
  hasItems: boolean;
  belowDeliveryMinimum: boolean;
  onReview: () => void;
  onContinueToDetails: () => void;
  onPlaceOrder: () => void;
};

export default function OrderTotalsActions({
  step,
  subtotal,
  tax,
  deliveryFee,
  total,
  isDelivery,
  hasItems,
  belowDeliveryMinimum,
  onReview,
  onContinueToDetails,
  onPlaceOrder,
}: OrderTotalsActionsProps) {
  return (
    <div className="shrink-0 px-6 py-4 border-t border-gray-200 space-y-3">
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
          <span className="tabular-nums">{formatPrice(tax)}</span>
        </div>
        {isDelivery && (
          <div className="flex justify-between text-gray-600">
            <span>Delivery fee</span>
            <span className="tabular-nums">
              {deliveryFee === 0 ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                formatPrice(deliveryFee)
              )}
            </span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
          <span>Total</span>
          <span className="text-primary-500 tabular-nums">{formatPrice(total)}</span>
        </div>
      </div>

      {belowDeliveryMinimum && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>
            Delivery orders have a {formatPrice(ordering.deliveryMinimum)} minimum.
            Add {formatPrice(ordering.deliveryMinimum - subtotal)} more to continue.
          </span>
        </div>
      )}

      {step === "menu" && (
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            type="button"
            onClick={onReview}
            disabled={!hasItems}
            className="btn-primary flex-1 inline-flex items-center justify-center gap-2 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
          >
            <CreditCard size={16} />
            Review Order
          </button>
          <a
            href={`tel:${business.phoneHref}`}
            className="btn-outline flex-1 inline-flex items-center justify-center gap-2 text-sm py-3"
          >
            <Phone size={16} />
            Call
          </a>
        </div>
      )}

      {step === "review" && (
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={onContinueToDetails}
            disabled={!hasItems}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Details
            <ChevronRight size={16} />
          </button>
          <a
            href={`tel:${business.phoneHref}`}
            className="btn-outline w-full inline-flex items-center justify-center gap-2 text-sm py-3"
          >
            <Phone size={16} />
            Or call {business.phone}
          </a>
        </div>
      )}

      {step === "details" && (
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={!hasItems || belowDeliveryMinimum}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
        >
          <CheckCircle2 size={16} />
          Place Order
        </button>
      )}
    </div>
  );
}
