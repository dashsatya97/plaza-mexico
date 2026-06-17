import AnimateIn from "./AnimateIn";

type LocationMapProps = {
  title?: string;
  subtitle?: string;
};

// Reusable location/map section. Defaults keep the original welcome copy, but
// pages can pass their own heading so the band reads naturally in context.
export default function LocationMap({
  title = "WELCOME TO OUR RESTAURANT",
  subtitle = "Your mood is our responsibility. Join us and experience the finest urban tastes.",
}: LocationMapProps) {
  return (
    <section className="bg-gray-100">
      <AnimateIn variant="fade-up" className="text-center py-8 sm:py-10 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl">
          {subtitle}
        </p>
      </AnimateIn>

      <AnimateIn variant="scale-in" delay={120}>
        <div className="overflow-hidden h-64 sm:h-80 md:h-96 bg-gray-300 shadow-lg">
          <iframe
            title="Location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.2!2d-72.9!3d41.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s549+Ferry+St+New+Haven+CT!5e0!3m2!1sen!2sus!4v1"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </AnimateIn>
    </section>
  );
}
