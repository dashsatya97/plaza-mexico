import { describe, it, expect } from "vitest";
import { sanitizeFormField, sanitizeInput } from "./inputFilters";

describe("sanitizeInput", () => {
  it("removes letters from phone values", () => {
    expect(sanitizeInput("phone", "(203) abc-0198")).toBe("(203) -0198");
  });

  it("removes digits from name values", () => {
    expect(sanitizeInput("name", "Maria123")).toBe("Maria");
  });

  it("limits zip codes to US formats", () => {
    expect(sanitizeInput("zip", "06513-12345")).toBe("06513-1234");
  });

  it("allows only digits for integer fields", () => {
    expect(sanitizeInput("integer", "12a3b4")).toBe("1234");
  });
});

describe("sanitizeFormField", () => {
  it("maps known field names to the correct filter", () => {
    expect(sanitizeFormField("phone", "555-abc")).toBe("555-");
    expect(sanitizeFormField("guestCount", "50 guests")).toBe("50");
  });
});
