import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

// Mock window.scrollY
const mockScrollY = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value,
  });
};

// Helper to set viewport size
const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event("resize"));
};

describe("Header Responsiveness", () => {
  beforeEach(() => {
    mockScrollY(0);
  });

  it("should render header on mobile (320px)", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    // Mobile menu button should be visible
    const mobileMenuButton = container.querySelector(
      "button[aria-label='Toggle menu']",
    );
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it("should render header on tablet (768px)", () => {
    setViewport(768, 1024);
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    const mobileMenuButton = container.querySelector(
      "button[aria-label='Toggle menu']",
    );
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it("should render header on desktop (1024px+)", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    const nav = container.querySelector("nav.hidden.lg\\:flex");
    expect(nav).toBeInTheDocument();
  });

  it("should have proper padding on all viewport sizes", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );
      const headerDiv = container.querySelector(".mx-auto");
      expect(headerDiv).toHaveClass("px-4", "sm:px-6", "lg:px-8");
    });
  });

  it("should maintain fixed positioning on scroll", () => {
    setViewport(768, 1024);
    mockScrollY(100);
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const header = container.querySelector("header");
    expect(header).toHaveClass("fixed", "top-0", "left-0", "right-0");
  });
});
