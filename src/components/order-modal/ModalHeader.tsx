import { ShoppingBag, X, CheckCircle2, ChevronRight } from "lucide-react";
import type { Step } from "./types";
import { stepHeadings, steps } from "./constants";

type ModalHeaderProps = {
  step: Step;
  stepIndex: number;
  onClose: () => void;
};

export default function ModalHeader({ step, stepIndex, onClose }: ModalHeaderProps) {
  const heading = stepHeadings[step];

  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0">
            <ShoppingBag size={20} className="text-primary-500" />
          </div>
          <div className="min-w-0">
            <h2
              id="order-modal-title"
              className="text-lg sm:text-xl font-bold text-gray-900 truncate"
            >
              {heading.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{heading.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="touch-target rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-gray-100 shrink-0 overflow-x-auto">
        {steps.map((s, idx) => {
          const isActive = idx === stepIndex;
          const isComplete = idx < stepIndex;
          return (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center gap-2 text-xs font-semibold ${
                  isActive
                    ? "text-primary-500"
                    : isComplete
                      ? "text-gray-600"
                      : "text-gray-300"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full border text-[11px] ${
                    isActive
                      ? "border-primary-500 bg-primary-500 text-white"
                      : isComplete
                        ? "border-gray-300 bg-gray-100 text-gray-600"
                        : "border-gray-200 text-gray-300"
                  }`}
                >
                  {isComplete ? <CheckCircle2 size={14} /> : idx + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight size={14} className="text-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
