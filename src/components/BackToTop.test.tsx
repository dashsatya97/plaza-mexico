import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "./BackToTop";

const mockScrollY = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value,
  });
};

describe("BackToTop", () => {
  beforeEach(() => {
    mockScrollY(0);
  });

  it("is hidden before scrolling past the threshold", () => {
    render(<BackToTop />);
    const button = screen.getByRole("button", { name: "Back to top" });
    expect(button).toHaveClass("opacity-0");
    expect(button).toHaveAttribute("tabindex", "-1");
  });

  it("becomes visible after scrolling down", () => {
    render(<BackToTop />);
    mockScrollY(400);
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: "Back to top" });
    expect(button).toHaveClass("opacity-100");
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("scrolls to the top when clicked", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    mockScrollY(500);
    render(<BackToTop />);
    fireEvent.scroll(window);

    fireEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollTo.mockRestore();
  });
});
