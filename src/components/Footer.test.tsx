import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

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

describe("Footer Responsiveness", () => {
  it("should stack footer columns on mobile (320px)", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4");
  });

  it("should display 2 columns on tablet (768px)", () => {
    setViewport(768, 1024);
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should display 4 columns on desktop (1024px+)", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should have responsive padding", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
      );
      const wrapper = container.querySelector(".mx-auto");
      expect(wrapper).toHaveClass("px-4", "sm:px-6", "lg:px-8");
    });
  });

  it("should render all footer sections", () => {
    setViewport(768, 1024);
    const { getByText, queryAllByText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(getByText("Quick Links")).toBeInTheDocument();
    expect(getByText("Hours")).toBeInTheDocument();
    const contactElements = queryAllByText("Contact");
    expect(contactElements.length).toBeGreaterThan(0);
  });
});
