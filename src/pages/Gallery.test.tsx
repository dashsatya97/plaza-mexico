import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Gallery from "./Gallery";

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

describe("Gallery Page Responsiveness", () => {
  it("should render gallery on mobile (320px)", () => {
    setViewport(320, 800);
    const { getByText } = render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
    );
    expect(getByText("Gallery")).toBeInTheDocument();
  });

  it("should stack gallery items on mobile", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-3");
  });

  it("should display 3 columns on desktop", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-3");
  });

  it("should render gallery images on all viewports", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Gallery />
        </BrowserRouter>,
      );
      const images = container.querySelectorAll("img");
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it("should have responsive heading sizes", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
    );
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-3xl", "sm:text-4xl", "md:text-5xl");
  });
});
