import { createPortal } from "react-dom";
import ModalHeader from "./ModalHeader";
import MenuList from "./MenuList";
import DetailsStep from "./DetailsStep";
import OrderSummaryPanel from "./OrderSummaryPanel";
import ConfirmationView from "./ConfirmationView";
import { useOrderCheckout } from "./useOrderCheckout";

export default function OrderModal() {
  const checkout = useOrderCheckout();

  if (!checkout.isOpen) return null;

  const {
    step,
    stepIndex,
    fulfillment,
    setFulfillment,
    form,
    errors,
    confirmationId,
    quantities,
    orderItems,
    isDelivery,
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    belowDeliveryMinimum,
    hasItems,
    minScheduleTime,
    orderMailto,
    estimate,
    updateQuantity,
    updateField,
    placeOrder,
    handleClose,
    goToReview,
    goBack,
    goToDetails,
  } = checkout;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 safe-x safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-label="Close order modal"
      />

      <div className="relative flex flex-col w-full max-w-5xl max-h-[95dvh] sm:max-h-[92dvh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-zoom-in overflow-hidden">
        <ModalHeader step={step} stepIndex={stepIndex} onClose={handleClose} />

        {step === "confirmation" ? (
          <div key="confirmation" className="animate-fade-in-up flex-1 min-h-0 overflow-y-auto">
            <ConfirmationView
              confirmationId={confirmationId}
              isDelivery={isDelivery}
              estimate={estimate}
              total={total}
              orderMailto={orderMailto}
              onClose={handleClose}
            />
          </div>
        ) : (
          <div
            key={step}
            className="flex flex-1 flex-col md:flex-row min-h-0 animate-fade-in-up overflow-hidden"
          >
            {step === "menu" && (
              <MenuList
                quantities={quantities}
                updateQuantity={updateQuantity}
              />
            )}

            {step === "details" && (
              <DetailsStep
                fulfillment={fulfillment}
                setFulfillment={setFulfillment}
                form={form}
                errors={errors}
                updateField={updateField}
                minScheduleTime={minScheduleTime}
              />
            )}

            <OrderSummaryPanel
              step={step}
              orderItems={orderItems}
              quantities={quantities}
              hasItems={hasItems}
              itemCount={itemCount}
              subtotal={subtotal}
              tax={tax}
              deliveryFee={deliveryFee}
              total={total}
              isDelivery={isDelivery}
              belowDeliveryMinimum={belowDeliveryMinimum}
              onBack={goBack}
              onReview={goToReview}
              onContinueToDetails={goToDetails}
              onPlaceOrder={placeOrder}
            />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
