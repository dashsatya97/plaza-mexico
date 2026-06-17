import { Link } from "react-router-dom";
import { Home, UtensilsCrossed } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import AnimateIn from "../components/AnimateIn";

export default function NotFoundPage() {
  useDocumentTitle(
    "Page not found",
    "The page you were looking for could not be found.",
  );

  return (
    <main className="page-offset">
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <AnimateIn immediate variant="scale-in" delay={0}>
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-500/10">
            <UtensilsCrossed size={40} className="text-primary-500" />
          </div>
        </AnimateIn>
        <AnimateIn immediate variant="fade-up" delay={100}>
          <p className="text-5xl sm:text-6xl font-extrabold text-primary-500">404</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-3 max-w-md text-gray-600">
            The page you&apos;re looking for may have moved or no longer exists.
            Let&apos;s get you back to something delicious.
          </p>
        </AnimateIn>
        <AnimateIn immediate variant="fade-up" delay={220}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Back to home
            </Link>
            <Link
              to="/menu"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              View the menu
            </Link>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
