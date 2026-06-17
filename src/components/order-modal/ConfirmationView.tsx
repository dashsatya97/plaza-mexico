import { Phone, Mail, CheckCircle2 } from "lucide-react";
import { business } from "../../data/restaurant";
import { formatPrice } from "../../utils/format";

type ConfirmationViewProps = {
  confirmationId: string;
  isDelivery: boolean;
  estimate: string;
  total: number;
  orderMailto: string;
  onClose: () => void;
};

export default function ConfirmationView({
  confirmationId,
  isDelivery,
  estimate,
  total,
  orderMailto,
  onClose,
}: ConfirmationViewProps) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-10">
      <div className="max-w-md mx-auto text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-zoom-in">
          <CheckCircle2 size={34} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Thanks for your order!</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ve saved your order and our team will call you shortly to confirm
          and arrange payment.
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Confirmation</span>
            <span className="font-semibold text-gray-900">{confirmationId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Method</span>
            <span className="font-semibold text-gray-900">
              {isDelivery ? "Delivery" : "Pickup"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {isDelivery ? "Estimated delivery" : "Ready by"}
            </span>
            <span className="font-semibold text-gray-900">{estimate}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
            <span className="text-gray-500">Order total</span>
            <span className="font-bold text-primary-500">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <a
            href={`tel:${business.phoneHref}`}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm py-3 min-h-11"
          >
            <Phone size={16} />
            Call {business.phone}
          </a>
          <a
            href={orderMailto}
            className="btn-outline w-full inline-flex items-center justify-center gap-2 text-sm py-3 min-h-11"
          >
            <Mail size={16} />
            Email a copy of this order
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 min-h-11 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
