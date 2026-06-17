export function fieldClass(
  field: string,
  errors: Partial<Record<string, string>>,
) {
  return `w-full px-3 py-3 sm:py-2.5 rounded-lg border bg-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition ${
    errors[field] ? "border-red-400" : "border-gray-200"
  }`;
}
