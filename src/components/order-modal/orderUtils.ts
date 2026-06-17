import { business, menuItems, ordering } from "../../data/restaurant";
import { createMailtoLink } from "../../utils/submissions";
import { formatPrice } from "../../utils/format";
import type { DetailsForm, OrderTotals } from "./types";
import type { MenuItem } from "../../data/restaurant";

export const earliestScheduleTime = () => {
  const date = new Date(Date.now() + ordering.minLeadTimeMinutes * 60_000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function validateDetails(
  form: DetailsForm,
  isDelivery: boolean,
): Partial<Record<keyof DetailsForm, string>> {
  const errors: Partial<Record<keyof DetailsForm, string>> = {};

  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (form.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number.";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address.";

  if (isDelivery) {
    if (!form.street.trim()) errors.street = "Street address is required.";
    if (!form.city.trim()) errors.city = "City is required.";
    if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim()))
      errors.zip = "Enter a valid ZIP code.";
  }

  if (form.timing === "scheduled" && !form.scheduledTime)
    errors.scheduledTime = "Choose a time.";

  return errors;
}

type MailtoParams = {
  confirmationId: string;
  isDelivery: boolean;
  form: DetailsForm;
  orderItems: MenuItem[];
  quantities: Record<number, number>;
  totals: OrderTotals;
};

export function buildOrderMailto({
  confirmationId,
  isDelivery,
  form,
  orderItems,
  quantities,
  totals,
}: MailtoParams) {
  const { subtotal, tax, deliveryFee, total } = totals;
  const lines: Array<[string, string] | string> = [
    ["Confirmation", confirmationId || "Pending"],
    ["Method", isDelivery ? "Delivery" : "Pickup"],
    ["Name", form.name],
    ["Phone", form.phone],
  ];

  if (form.email) lines.push(["Email", form.email]);

  if (isDelivery) {
    const address = [form.street, form.apt && `Apt/Unit ${form.apt}`, form.city, form.zip]
      .filter(Boolean)
      .join(", ");
    lines.push(["Address", address]);
  }

  lines.push([
    "Requested time",
    form.timing === "asap" ? "As soon as possible" : form.scheduledTime,
  ]);
  lines.push("", "Items:");

  orderItems.forEach((item) => {
    lines.push(
      `  ${quantities[item.id]} x ${item.name} — ${formatPrice(
        item.price * quantities[item.id],
      )}`,
    );
  });

  lines.push("", `Subtotal: ${formatPrice(subtotal)}`, `Tax: ${formatPrice(tax)}`);

  if (isDelivery) {
    lines.push(
      `Delivery fee: ${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}`,
    );
  }

  lines.push(`Total: ${formatPrice(total)}`);
  if (form.instructions) lines.push("", `Notes: ${form.instructions}`);

  return createMailtoLink(
    business.email,
    `Online order ${confirmationId || ""}`.trim(),
    lines,
  );
}

export function getOrderItems(quantities: Record<number, number>) {
  return menuItems.filter((item) => (quantities[item.id] ?? 0) > 0);
}

export function computeTotals(
  orderItems: MenuItem[],
  quantities: Record<number, number>,
  isDelivery: boolean,
  taxRate: number,
) {
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0,
  );
  const tax = subtotal * taxRate;
  const deliveryFee =
    isDelivery && subtotal < ordering.freeDeliveryThreshold
      ? ordering.deliveryFee
      : 0;
  const total = subtotal + tax + deliveryFee;
  const itemCount = orderItems.reduce(
    (sum, item) => sum + quantities[item.id],
    0,
  );
  const belowDeliveryMinimum =
    isDelivery && subtotal < ordering.deliveryMinimum;

  return {
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    belowDeliveryMinimum,
    hasItems: orderItems.length > 0,
  };
}
