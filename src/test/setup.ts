import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Setup window.matchMedia for responsive testing
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Prevent happy-dom from loading external iframe content during tests.
const originalIframeSetAttribute = HTMLIFrameElement.prototype.setAttribute;
HTMLIFrameElement.prototype.setAttribute = function (
  name: string,
  value: string,
) {
  if (
    name.toLowerCase() === "src" &&
    /^https?:\/\//.test(value)
  ) {
    originalIframeSetAttribute.call(this, "data-testid-src", value);
    originalIframeSetAttribute.call(this, name, "about:blank");
    return;
  }

  originalIframeSetAttribute.call(this, name, value);
};
