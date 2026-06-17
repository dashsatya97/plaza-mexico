export type Step = "menu" | "review" | "details" | "confirmation";
export type Fulfillment = "pickup" | "delivery";
export type Timing = "asap" | "scheduled";

export type DetailsForm = {
  name: string;
  phone: string;
  email: string;
  street: string;
  apt: string;
  city: string;
  zip: string;
  timing: Timing;
  scheduledTime: string;
  instructions: string;
};

export type OrderTotals = {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
};
