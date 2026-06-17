import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "./Contact";

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

describe("Contact Page Responsiveness", () => {
  it("should render contact page on mobile (320px)", () => {
    setViewport(320, 800);
    const { getByText } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    expect(getByText("Contact Us")).toBeInTheDocument();
  });

  it("should stack layout on mobile", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "lg:grid-cols-2");
  });

  it("should display 2 columns on desktop", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "lg:grid-cols-2");
  });

  it("should render contact form on all viewports", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { queryAllByText } = render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>,
      );
      const touchElements = queryAllByText("Get in Touch");
      expect(touchElements.length).toBeGreaterThan(0);
    });
  });

  it("should have responsive heading sizes", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-3xl", "sm:text-4xl", "md:text-5xl");
  });

  it("should display contact info cards responsively", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { queryAllByText } = render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>,
      );
      expect(queryAllByText("Address").length).toBeGreaterThan(0);
      expect(queryAllByText("Phone").length).toBeGreaterThan(0);
      expect(queryAllByText("Email").length).toBeGreaterThan(0);
    });
  });
});
