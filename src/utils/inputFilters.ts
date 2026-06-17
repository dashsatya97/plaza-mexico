export type InputKind =
  | "name"
  | "phone"
  | "email"
  | "zip"
  | "integer"
  | "city"
  | "address"
  | "unit"
  | "text"
  | "multiline";

/** Strips characters that do not belong in the given input type. */
export function sanitizeInput(kind: InputKind, value: string): string {
  switch (kind) {
    case "name":
    case "city":
      return value.replace(/[^a-zA-ZÀ-ÿ\s'\-.]/g, "");
    case "phone":
      return value.replace(/[^\d+().\s-]/g, "");
    case "email":
      return value.replace(/[^a-zA-Z0-9@._+-]/g, "");
    case "zip": {
      const digitsAndDash = value.replace(/[^\d-]/g, "");
      const [first = "", ...rest] = digitsAndDash.split("-");
      const suffix = rest.join("");
      if (!suffix) return first.slice(0, 5);
      return `${first.slice(0, 5)}-${suffix.slice(0, 4)}`;
    }
    case "integer":
      return value.replace(/\D/g, "");
    case "address":
      return value.replace(/[^a-zA-Z0-9À-ÿ\s#.,'\-/]/g, "");
    case "unit":
      return value.replace(/[^a-zA-Z0-9\s#\-/]/g, "");
    case "text":
    case "multiline":
      // Strip non-printable control characters (keep tab/newline).
      // eslint-disable-next-line no-control-regex -- intentional input hygiene
      return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
    default:
      return value;
  }
}

const FORM_FIELD_KINDS: Record<string, InputKind> = {
  name: "name",
  phone: "phone",
  email: "email",
  zip: "zip",
  guestCount: "integer",
  city: "city",
  street: "address",
  apt: "unit",
  subject: "text",
  message: "multiline",
  notes: "multiline",
  instructions: "multiline",
};

/** Maps common form field names to an input sanitizer kind. */
export function sanitizeFormField(fieldName: string, value: string): string {
  const kind = FORM_FIELD_KINDS[fieldName];
  return kind ? sanitizeInput(kind, value) : sanitizeInput("text", value);
}
