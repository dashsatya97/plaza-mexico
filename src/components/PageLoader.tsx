import { Loader2 } from "lucide-react";

/** Branded fallback shown while a lazily-loaded route chunk is fetched. */
export default function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-primary-500 animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <Loader2 size={40} className="animate-spin" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading page…</p>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
