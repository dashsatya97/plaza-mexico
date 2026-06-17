import { Clock, MapPin, User } from "lucide-react";
import Field from "./Field";
import { fieldClass } from "./fieldStyles";
import FulfillmentToggle from "./FulfillmentToggle";
import type { DetailsForm, Fulfillment } from "./types";

type DetailsStepProps = {
  fulfillment: Fulfillment;
  setFulfillment: (value: Fulfillment) => void;
  form: DetailsForm;
  errors: Partial<Record<keyof DetailsForm, string>>;
  updateField: (field: keyof DetailsForm, value: string) => void;
  minScheduleTime: string;
};

export default function DetailsStep({
  fulfillment,
  setFulfillment,
  form,
  errors,
  updateField,
  minScheduleTime,
}: DetailsStepProps) {
  const isDelivery = fulfillment === "delivery";
  const inputClass = (field: keyof DetailsForm) => fieldClass(field, errors);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 md:border-r border-gray-100 space-y-6">
      <FulfillmentToggle fulfillment={fulfillment} onChange={setFulfillment} />

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
          <User size={15} className="text-primary-500" />
          Contact details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full name" required error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              maxLength={80}
              autoComplete="name"
              className={inputClass("name")}
              placeholder="Your name"
            />
          </Field>
          <Field label="Phone" required error={errors.phone}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              maxLength={10}
              className={inputClass("phone")}
              placeholder="(203) 555-0100"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email (optional)" error={errors.email}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                maxLength={120}
                className={inputClass("email")}
                placeholder="your@email.com"
              />
            </Field>
          </div>
        </div>
      </div>

      {isDelivery && (
        <div className="animate-fade-in">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
            <MapPin size={15} className="text-primary-500" />
            Delivery address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Field label="Street address" required error={errors.street}>
                <input
                  type="text"
                  value={form.street}
                  onChange={(e) => updateField("street", e.target.value)}
                  maxLength={120}
                  className={inputClass("street")}
                  placeholder="123 Main St"
                />
              </Field>
            </div>
            <Field label="Apt / Unit" error={errors.apt}>
              <input
                type="text"
                value={form.apt}
                onChange={(e) => updateField("apt", e.target.value)}
                maxLength={20}
                className={inputClass("apt")}
                placeholder="Apt 4B"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="City" required error={errors.city}>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  maxLength={60}
                  className={inputClass("city")}
                  placeholder="New Haven"
                />
              </Field>
            </div>
            <Field label="ZIP" required error={errors.zip}>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9-]*"
                value={form.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                maxLength={10}
                autoComplete="postal-code"
                className={inputClass("zip")}
                placeholder="06513"
              />
            </Field>
          </div>
        </div>
      )}

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
          <Clock size={15} className="text-primary-500" />
          {isDelivery ? "Delivery time" : "Pickup time"}
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateField("timing", "asap")}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              form.timing === "asap"
                ? "border-primary-500 bg-primary-50 text-primary-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            As soon as possible
          </button>
          <button
            type="button"
            onClick={() => updateField("timing", "scheduled")}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              form.timing === "scheduled"
                ? "border-primary-500 bg-primary-50 text-primary-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            Schedule for later
          </button>
        </div>
        {form.timing === "scheduled" && (
          <div className="mt-3 max-w-[200px] animate-fade-in">
            <Field label="Requested time" required error={errors.scheduledTime}>
              <input
                type="time"
                value={form.scheduledTime}
                min={minScheduleTime}
                onChange={(e) => updateField("scheduledTime", e.target.value)}
                className={inputClass("scheduledTime")}
              />
            </Field>
            <p className="mt-1 text-xs text-gray-400">
              Earliest available: {minScheduleTime}
            </p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
          Special instructions
        </h3>
        <textarea
          value={form.instructions}
          onChange={(e) => updateField("instructions", e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full px-3 py-3 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition resize-none"
          placeholder="Allergies, spice level, gate code, drop-off notes…"
        />
        <p className="mt-1 text-right text-xs text-gray-400">
          {form.instructions.length}/500
        </p>
      </div>
    </div>
  );
}
