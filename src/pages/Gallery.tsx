import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "../data/restaurant";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import PageHero from "../components/PageHero";
import AnimateIn from "../components/AnimateIn";

// Gallery page showcasing images of the restaurant and its food.
export default function GalleryPage() {
  useDocumentTitle(
    "Gallery",
    "A look inside Plaza Mexico — our atmosphere, dishes, and people.",
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? prev : (prev + 1) % gallery.length,
      ),
    [],
  );
  const showPrev = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? prev : (prev - 1 + gallery.length) % gallery.length,
      ),
    [],
  );

  useBodyScrollLock(activeIndex !== null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, showNext, showPrev]);

  const activeImage = activeIndex === null ? null : gallery[activeIndex];

  return (
    <main className="page-offset">
      <PageHero
        title="Gallery"
        subtitle="Explore the vibrant atmosphere and delicious creations at our restaurant."
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {gallery.map((item, i) => (
              <AnimateIn key={i} variant="scale-in" delay={i * 100}>
                <button
                  type="button"
                  className="group relative h-56 sm:h-64 md:h-72 w-full rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Open ${item.title} image`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover img-hover-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-base sm:text-lg">
                      {item.title}
                    </p>
                  </div>
                </button>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 safe-x safe-top safe-bottom animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeImage.title} preview`}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 touch-target rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 z-10 touch-target -translate-y-1/2 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 z-10 touch-target -translate-y-1/2 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>

          <div
            className="relative max-w-4xl w-full animate-zoom-in px-2"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="w-full h-auto max-h-[75dvh] sm:max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="mt-3 sm:mt-4 text-center text-white text-base sm:text-lg font-semibold px-2">
              {activeImage.title}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
