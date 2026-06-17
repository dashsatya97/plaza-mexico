import { describe, it, expect, beforeEach } from "vitest";
import { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderModal from "./order-modal/OrderModal";
import { OrderProvider, useOrder } from "../context/OrderContext";
import { menuItems } from "../data/restaurant";

// Seeds the shared cart and opens the modal on mount so each test starts from a
// realistic state.
function Seed({ id, qty }: { id: number; qty: number }) {
  const { addItem, openOrder } = useOrder();
  useEffect(() => {
    addItem(id, qty);
    openOrder();
  }, [addItem, openOrder, id, qty]);
  return null;
}

const renderModal = (id = menuItems[0].id, qty = 2) =>
  render(
    <OrderProvider>
      <Seed id={id} qty={qty} />
      <OrderModal />
    </OrderProvider>,
  );

const cheapItem = menuItems.find((item) => item.price < 7) ?? menuItems[0];

describe("OrderModal flow", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("opens with the seeded cart and the build step", () => {
    renderModal();
    expect(screen.getByText("Order now")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /review order/i }),
    ).toBeEnabled();
  });

  it("walks build → review → details → confirmation and saves the order", () => {
    renderModal();

    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /continue to details/i }),
    );

    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("(203) 555-0100"), {
      target: { value: "2035550100" },
    });

    fireEvent.click(screen.getByRole("button", { name: /place order/i }));

    expect(screen.getByText(/thanks for your order/i)).toBeInTheDocument();

    const submissions = JSON.parse(
      window.localStorage.getItem("plaza-mexico-submissions") ?? "[]",
    );
    expect(submissions.length).toBeGreaterThan(0);
    expect(submissions[0].kind).toBe("order");
    expect(submissions[0].payload.fulfillment).toBe("pickup");
  });

  it("blocks delivery orders below the minimum", () => {
    // A single cheap item keeps the subtotal under the delivery minimum.
    renderModal(cheapItem.id, 1);

    fireEvent.click(screen.getByRole("button", { name: /review order/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /continue to details/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /^delivery/i }));

    expect(screen.getByRole("button", { name: /place order/i })).toBeDisabled();
    expect(screen.getByText(/minimum/i)).toBeInTheDocument();
  });
});
