import type { DetailsForm, Step } from "./types";

export const emptyForm: DetailsForm = {
  name: "",
  phone: "",
  email: "",
  street: "",
  apt: "",
  city: "",
  zip: "",
  timing: "asap",
  scheduledTime: "",
  instructions: "",
};

export const steps: { id: Step; label: string }[] = [
  { id: "menu", label: "Build" },
  { id: "review", label: "Review" },
  { id: "details", label: "Details" },
  { id: "confirmation", label: "Done" },
];

export const stepHeadings: Record<Step, { title: string; subtitle: string }> = {
  menu: {
    title: "Order now",
    subtitle: "Select items and build your order",
  },
  review: {
    title: "Review order",
    subtitle: "Make sure everything looks right",
  },
  details: {
    title: "Delivery or pickup",
    subtitle: "Tell us how and when you'd like your order",
  },
  confirmation: {
    title: "Order received",
    subtitle: "We'll call you to confirm the details",
  },
};
