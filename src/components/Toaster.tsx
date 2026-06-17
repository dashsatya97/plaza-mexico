import { CheckCircle2 } from "lucide-react";
import { useOrder } from "../context/OrderContext";

/** Lightweight toast surface driven by OrderContext (e.g. "Added to order"). */
export default function Toaster() {
  const { toast } = useOrder();

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 px-4 safe-bottom safe-x"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-2xl animate-fade-in">
        <CheckCircle2 size={18} className="text-green-400" />
        {toast}
      </div>
    </div>
  );
}
