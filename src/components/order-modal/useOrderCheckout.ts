import { useEffect, useMemo, useState } from "react";
import { ordering, taxRate } from "../../data/restaurant";
import { saveSubmission } from "../../utils/submissions";
import { useOrder } from "../../context/OrderContext";
import { emptyForm, steps } from "./constants";
import {
  buildOrderMailto,
  computeTotals,
  earliestScheduleTime,
  getOrderItems,
  validateDetails,
} from "./orderUtils";
import type { DetailsForm, Fulfillment, Step } from "./types";
import { sanitizeInput, type InputKind } from "../../utils/inputFilters";

const FIELD_KINDS: Partial<Record<keyof DetailsForm, InputKind>> = {
  name: "name",
  phone: "phone",
  email: "email",
  street: "address",
  apt: "unit",
  city: "city",
  zip: "zip",
  instructions: "multiline",
};

export function useOrderCheckout() {
  const {
    quantities,
    addItem,
    clearCart,
    isModalOpen: isOpen,
    closeOrder,
  } = useOrder();

  const [step, setStep] = useState<Step>("menu");
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  const [form, setForm] = useState<DetailsForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof DetailsForm, string>>>(
    {},
  );
  const [confirmationId, setConfirmationId] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOrder();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeOrder]);

  const orderItems = getOrderItems(quantities);
  const isDelivery = fulfillment === "delivery";
  const {
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    belowDeliveryMinimum,
    hasItems,
  } = computeTotals(orderItems, quantities, isDelivery, taxRate);

  // Recompute the earliest selectable time whenever the user navigates between
  // steps so the picker's minimum stays current as time passes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const minScheduleTime = useMemo(() => earliestScheduleTime(), [step]);

  const updateField = (field: keyof DetailsForm, value: string) => {
    const kind = FIELD_KINDS[field];
    const nextValue = kind ? sanitizeInput(kind, value) : value;

    setForm((prev) => ({ ...prev, [field]: nextValue }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const orderMailto = useMemo(
    () =>
      buildOrderMailto({
        confirmationId,
        isDelivery,
        form,
        orderItems,
        quantities,
        totals: { subtotal, tax, deliveryFee, total },
      }),
    [
      confirmationId,
      isDelivery,
      form,
      orderItems,
      quantities,
      subtotal,
      tax,
      deliveryFee,
      total,
    ],
  );

  const placeOrder = () => {
    const nextErrors = validateDetails(form, isDelivery);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const record = saveSubmission(
      "order",
      {
        fulfillment,
        contact: { name: form.name, phone: form.phone, email: form.email },
        delivery: isDelivery
          ? { street: form.street, apt: form.apt, city: form.city, zip: form.zip }
          : null,
        timing: form.timing === "asap" ? "ASAP" : form.scheduledTime,
        instructions: form.instructions,
        items: orderItems.map((item) => ({
          name: item.name,
          quantity: quantities[item.id],
          price: item.price,
        })),
        totals: { subtotal, tax, deliveryFee, total },
      },
      "ORD",
    );

    setConfirmationId(record.id);
    setStep("confirmation");
  };

  const handleClose = () => {
    if (confirmationId) clearCart();
    setStep("menu");
    setFulfillment("pickup");
    setForm(emptyForm);
    setErrors({});
    setConfirmationId("");
    closeOrder();
  };

  const goToReview = () => hasItems && setStep("review");
  const goBack = () => setStep(step === "details" ? "review" : "menu");

  const stepIndex = steps.findIndex((s) => s.id === step);

  const estimate =
    form.timing === "asap"
      ? isDelivery
        ? ordering.deliveryEstimate
        : ordering.pickupEstimate
      : form.scheduledTime;

  return {
    isOpen,
    step,
    stepIndex,
    fulfillment,
    setFulfillment,
    form,
    errors,
    confirmationId,
    quantities,
    orderItems,
    isDelivery,
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    belowDeliveryMinimum,
    hasItems,
    minScheduleTime,
    orderMailto,
    estimate,
    updateQuantity: (id: number, delta: number) => addItem(id, delta),
    updateField,
    placeOrder,
    handleClose,
    goToReview,
    goBack,
    goToDetails: () => setStep("details"),
  };
}
