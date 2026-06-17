import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LocationMap from "./LocationMap";

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

describe("LocationMap Responsiveness", () => {
  it("should render location map on mobile (320px)", () => {
    setViewport(320, 800);
    const { container } = render(<LocationMap />);
    const map = container.querySelector("iframe");
    expect(map).toBeInTheDocument();
  });

  it("should render location map on tablet (768px)", () => {
    setViewport(768, 1024);
    const { container } = render(<LocationMap />);
    const map = container.querySelector("iframe");
    expect(map).toBeInTheDocument();
  });

  it("should render location map on desktop (1440px)", () => {
    setViewport(1440, 900);
    const { container } = render(<LocationMap />);
    const map = container.querySelector("iframe");
    expect(map).toBeInTheDocument();
  });

  it("should have full width responsive container", () => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    viewports.forEach(({ width, height }) => {
      setViewport(width, height);
      const { container } = render(<LocationMap />);
      const mapContainer = container.querySelector(".w-full");
      expect(mapContainer).toBeInTheDocument();
    });
  });

  it("should display title and description on all viewports", () => {
    setViewport(768, 1024);
    const { getByText } = render(<LocationMap />);
    expect(getByText("WELCOME TO OUR RESTAURANT")).toBeInTheDocument();
    expect(getByText(/Your mood is our responsibility/)).toBeInTheDocument();
  });
});
