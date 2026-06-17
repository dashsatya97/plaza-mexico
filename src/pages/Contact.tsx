import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { business, hours } from "../data/restaurant";
import { createMailtoLink, saveSubmission } from "../utils/submissions";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import LocationMap from "../components/LocationMap";
import AnimateIn from "../components/AnimateIn";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Contact page renders contact details, opening hours, and a contact form.
export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [confirmationId, setConfirmationId] = useState("");
  useDocumentTitle(
    "Contact Us",
    `Get in touch with ${business.name} in New Haven — address, phone, hours, and a message form.`,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = saveSubmission("contact", formData, "MSG");
    setConfirmationId(record.id);
  };

  const mailtoLink = createMailtoLink(
    business.email,
    `Website message: ${formData.subject || "New inquiry"}`,
    [
      ["Confirmation", confirmationId || "Pending"],
      ["Name", formData.name],
      ["Email", formData.email],
      ["Subject", formData.subject],
      "",
      formData.message,
    ],
  );

  return (
    <main className="page-offset">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out anytime."
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
            <AnimateIn variant="slide-right">
            <div>
              {/* Contact info cards include address, phone, and email */}
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: business.address,
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: business.phone,
                    href: `tel:${business.phoneHref}`,
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: business.email,
                    href: `mailto:${business.email}`,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <AnimateIn key={item.title} variant="fade-up" delay={index * 80}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-primary-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-600 hover:text-primary-500 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                      </div>
                    </div>
                    </AnimateIn>
                  );
                })}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={22} className="text-primary-500" />
                  <h3 className="text-xl font-bold text-gray-900">Hours</h3>
                </div>
                <div>
                  {/* Business hours grouped by weekdays and weekends */}
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-700">Weekdays (Mon-Fri)</span>
                      <span className="text-gray-900">{hours.Monday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Weekends (Sat-Sun)</span>
                      <span className="text-gray-900">{hours.Saturday}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={120}>
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                {confirmationId ? (
                  <div className="text-center py-8">
                    <CheckCircle
                      size={48}
                      className="text-green-500 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Prepared
                    </h3>
                    <p className="text-gray-600">
                      Your message was saved with confirmation{" "}
                      <span className="font-semibold">{confirmationId}</span>.
                      Send it by email so our team receives it.
                    </p>
                    <a
                      href={mailtoLink}
                      className="btn-primary inline-flex items-center justify-center gap-2 mt-6"
                    >
                      <Mail size={18} />
                      Open Email Draft
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmationId("");
                        setFormData({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="block mx-auto mt-4 text-primary-500 font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Send a Message
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          minLength={2}
                          maxLength={80}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          maxLength={120}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        minLength={3}
                        maxLength={120}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        minLength={10}
                        maxLength={1000}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white resize-none"
                        placeholder="Tell us more..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <LocationMap
        title="Find Us in New Haven"
        subtitle="Stop by for dine-in, pickup, or to say hola — we're easy to reach on Ferry St."
      />
    </main>
  );
}
