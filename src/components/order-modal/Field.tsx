import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export default function Field({ label, required, error, children }: FieldProps) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </label>
  );
}
