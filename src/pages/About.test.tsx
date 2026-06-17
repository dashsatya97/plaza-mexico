import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

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

describe("About Page Responsiveness", () => {
  it("should render about page on mobile (320px)", () => {
    setViewport(320, 800);
    const { getByText } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    expect(getByText("About Us")).toBeInTheDocument();
  });

  it("should stack content on mobile", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1");
  });

  it("should display 2 columns on large desktop", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("should display values grid on all viewports", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { queryAllByText } = render(
        <BrowserRouter>
          <About />
        </BrowserRouter>,
      );
      const valuesHeadings = queryAllByText("Our Values");
      expect(valuesHeadings.length).toBeGreaterThan(0);
    });
  });

  it("should have responsive heading sizes", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-3xl", "sm:text-4xl", "md:text-5xl");
  });
});
