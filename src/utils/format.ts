// Shared formatting helpers so currency rendering stays consistent everywhere.

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (amount: number) => currencyFormatter.format(amount);
