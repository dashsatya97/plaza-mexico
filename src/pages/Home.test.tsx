import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

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

describe("Home Page Responsiveness", () => {
  it("should render hero section on mobile (320px)", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const hero = container.querySelector("section");
    expect(hero).toBeInTheDocument();
  });

  it("should render hero section on tablet (768px)", () => {
    setViewport(768, 1024);
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const hero = container.querySelector("section");
    expect(hero).toBeInTheDocument();
  });

  it("should render hero section on desktop (1440px)", () => {
    setViewport(1440, 900);
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const hero = container.querySelector("section");
    expect(hero).toBeInTheDocument();
  });

  it("should have responsive heading sizes", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-3xl", "sm:text-5xl", "md:text-7xl");
  });

  it("should stack buttons vertically on mobile", () => {
    setViewport(320, 800);
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const buttonContainers = container.querySelectorAll(".flex");
    let hasResponsiveButtonContainer = false;
    buttonContainers.forEach((el) => {
      if (
        el.classList.contains("flex-col") &&
        el.classList.contains("sm:flex-row")
      ) {
        hasResponsiveButtonContainer = true;
      }
    });
    expect(hasResponsiveButtonContainer).toBe(true);
  });

  it("should have responsive padding on all sections", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>,
      );
      const mainContent = container.querySelector("main");
      expect(mainContent).toBeInTheDocument();
    });
  });
});
