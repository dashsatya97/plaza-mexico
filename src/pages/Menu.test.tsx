import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";

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

describe("Menu Page Responsiveness", () => {
  it("should render menu on mobile (320px)", () => {
    setViewport(320, 800);
    const { getByText } = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    );
    expect(getByText("Our Menu")).toBeInTheDocument();
  });

  it("should stack layout on mobile (grid-cols-1)", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-4");
  });

  it("should have 4-column layout on desktop", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    );
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-4");
  });

  it("should render menu items grid responsively", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>,
      );
      const itemsGrid = container.querySelectorAll(".grid");
      expect(itemsGrid.length).toBeGreaterThan(0);
    });
  });

  it("should have responsive padding on all viewports", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>,
      );
      const wrapper = container.querySelector(".px-4");
      expect(wrapper).toBeInTheDocument();
    });
  });

  it("should display categories filter on all viewports", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>,
      );
      expect(container.textContent).toContain("Categories");
    });
  });
});
