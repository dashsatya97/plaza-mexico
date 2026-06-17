import { useState } from "react";
import {
  Users,
  Heart,
  Utensils,
  Clock,
  MapPin,
  ChefHat,
  Cake,
  Music,
  GraduationCap,
  Mail,
} from "lucide-react";
import { business } from "../data/restaurant";
import { createMailtoLink, saveSubmission } from "../utils/submissions";
import { sanitizeFormField } from "../utils/inputFilters";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import AnimateIn from "../components/AnimateIn";

export default function CateringPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    notes: "",
  });

  const [confirmationId, setConfirmationId] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  useDocumentTitle(
    "Catering",
    `Authentic Mexican catering from ${business.name} for weddings, corporate events, and celebrations.`,
  );

  const eventTypes = [
    {
      icon: Heart,
      title: "Weddings",
      description:
        "Make your special day unforgettable with our authentic Mexican cuisine and professional catering service.",
      features: ["Customizable menus", "Dedicated staff", "Setup & cleanup"],
    },
    {
      icon: Users,
      title: "Corporate Events",
      description:
        "Impress clients and colleagues with our delicious catering for conferences, meetings, and business gatherings.",
      features: [
        "Professional service",
        "Flexible timing",
        "Multiple menu options",
      ],
    },
    {
      icon: Cake,
      title: "Birthdays & Celebrations",
      description:
        "Celebrate life's milestones with family and friends enjoying our authentic Mexican flavors.",
      features: ["Theme-friendly", "All age groups", "Custom arrangements"],
    },
    {
      icon: Utensils,
      title: "Family Gatherings",
      description:
        "Bring people together with traditional Mexican cuisine prepared fresh for your family reunion.",
      features: ["Warm service", "Family-sized portions", "Nostalgic recipes"],
    },
    {
      icon: Music,
      title: "Festivals & Parties",
      description:
        "Add authentic Mexican flair to your party with colorful dishes and festive presentation.",
      features: [
        "Vibrant presentation",
        "Interactive service",
        "Fiesta packages",
      ],
    },
    {
      icon: GraduationCap,
      title: "Academic Events",
      description:
        "Celebrate academic achievements with catering for graduations, seminars, and educational gatherings.",
      features: ["Budget-friendly", "Bulk service", "Professional setup"],
    },
  ];

  const features = [
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description:
        "Professionally trained chefs with years of experience in Mexican cuisine",
    },
    {
      icon: Utensils,
      title: "Fresh Ingredients",
      description:
        "We use only the freshest, highest quality ingredients for every dish",
    },
    {
      icon: MapPin,
      title: "On-Site Catering",
      description:
        "We can cater at your venue, ensuring hot, fresh food delivered to your location",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "We accommodate your event schedule, no matter the time of day",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeFormField(name, value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = saveSubmission("catering", formData, "CAT");
    setConfirmationId(record.id);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      budget: "",
      notes: "",
    });
    setConfirmationId("");
  };

  const mailtoLink = createMailtoLink(
    business.cateringEmail,
    `Catering quote request: ${formData.eventType || "New event"}`,
    [
      ["Confirmation", confirmationId || "Pending"],
      ["Name", formData.name],
      ["Email", formData.email],
      ["Phone", formData.phone],
      ["Event type", formData.eventType],
      ["Event date", formData.eventDate],
      ["Guest count", formData.guestCount],
      ["Budget", formData.budget || "Not specified"],
      "",
      formData.notes || "No additional notes.",
    ],
  );

  return (
    <main className="page-offset">
      <PageHero
        title="Catering for Every Occasion"
        subtitle="No matter what kind of event you're planning, we have the perfect menu and service to make it memorable."
      />

      {/* Event Types Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, idx) => {
              const Icon = event.icon;
              return (
                <AnimateIn key={idx} variant="fade-up" delay={(idx % 6) * 80}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-500 h-full">
                    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8">
                      <Icon className="w-16 h-16 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <ul className="space-y-2">
                        {event.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn variant="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Plaza Mexico Catering?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We pride ourselves on excellence, authenticity, and exceptional
              service.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-500 mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Your Catering Quote
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and our catering specialist will contact
              you within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={80}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={120}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="(123) 456-7890"
                />
              </div>

              {/* Event Type */}
              <div>
                <label
                  htmlFor="eventType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                >
                  <option value="">Select an event type</option>
                  {eventTypes.map((event, idx) => (
                    <option key={idx} value={event.title}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={today}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label
                  htmlFor="guestCount"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="guestCount"
                  name="guestCount"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                  minLength={1}
                  maxLength={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="50"
                />
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                >
                  <option value="">Select budget range</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="above-5000">Above $5,000</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                maxLength={1200}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                placeholder="Tell us about your event, dietary restrictions, menu preferences, or any special requests..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-300"
              >
                Request a Quote
              </button>
              {confirmationId && (
                <div
                  className="mt-4 text-center text-green-700 font-semibold animate-fade-in"
                  role="status"
                >
                  <p>Quote request saved as {confirmationId}.</p>
                  <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-white hover:bg-primary-600 transition-colors"
                    >
                      <Mail size={18} />
                      Open Email Draft
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-primary-500 hover:underline"
                    >
                      Start another request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Questions? Contact Us
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Call or visit us to discuss your catering needs in detail.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="bg-white/20 rounded-lg px-6 py-4">
              <p className="text-white font-semibold">Phone</p>
              <a
                href={`tel:${business.phoneHref}`}
                className="text-white/80 hover:text-white transition-colors"
              >
                {business.phone}
              </a>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-4">
              <p className="text-white font-semibold">Email</p>
              <a
                href={`mailto:${business.cateringEmail}`}
                className="text-white/80 hover:text-white transition-colors break-all"
              >
                {business.cateringEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
