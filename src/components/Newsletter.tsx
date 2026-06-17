import { useState } from "react";
import { Mail, CheckCircle2, Send } from "lucide-react";
import { saveSubmission } from "../utils/submissions";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Footer email capture. Persists locally (no backend) and confirms inline. */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    saveSubmission("newsletter", { email: email.trim() }, "NEWS");
    setSubscribed(true);
    setEmail("");
    setError("");
  };

  return (
    <div className="rounded-2xl bg-gray-800/60 p-6 ring-1 ring-white/5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
            <Mail size={20} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Join our newsletter
            </h4>
            <p className="text-sm text-gray-400">
              Specials, new dishes, and events — straight to your inbox.
            </p>
          </div>
        </div>

        {subscribed ? (
          <p
            className="inline-flex items-center gap-2 text-sm font-medium text-green-400"
            role="status"
          >
            <CheckCircle2 size={18} />
            You&apos;re subscribed. Gracias!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-auto"
            noValidate
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@email.com"
                className="w-full sm:w-64 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-base sm:text-sm text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-3 min-h-11 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                <Send size={16} />
                Subscribe
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-400" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
