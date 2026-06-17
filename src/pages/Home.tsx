import { Link } from "react-router-dom";
import {
  Leaf,
  Flame,
  Users,
  Star,
  ChevronRight,
  Clock,
  UtensilsCrossed,
} from "lucide-react";
import {
  hero,
  features,
  menuItems,
  testimonials,
  business,
  hours,
} from "../data/restaurant";
import { formatPrice } from "../utils/format";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import LocationMap from "../components/LocationMap";
import AnimateIn from "../components/AnimateIn";

const iconMap = { Leaf, Flame, Users };

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/17592698/pexels-photo-17592698.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Restaurant ambiance"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <AnimateIn immediate variant="fade-down" delay={0}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/10">
            <UtensilsCrossed size={16} className="text-secondary-500" />
            {business.tagline}
          </div>
        </AnimateIn>

        <AnimateIn immediate variant="fade-up" delay={100}>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-2">
            {hero.title}
          </h1>
        </AnimateIn>

        <AnimateIn immediate variant="fade-up" delay={220}>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            {hero.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn immediate variant="fade-up" delay={340}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${business.phoneHref}`} className="btn-primary text-base">
              {hero.primaryCTA}
            </a>
            <Link to="/menu" className="btn-secondary text-base">
              {hero.secondaryCTA}
            </Link>
          </div>
        </AnimateIn>
      </div>

      <AnimateIn immediate variant="fade-in" delay={600}>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 safe-bottom">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}

function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <h2 className="section-title text-gray-900">Why Choose Us</h2>
          <p className="section-subtitle">
            We bring the heart of Mexico to your table with every dish we prepare.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = iconMap[feat.icon];
            return (
              <AnimateIn key={feat.title} variant="fade-up" delay={index * 100}>
                <div className="group text-center p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 h-full">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                    <Icon
                      size={28}
                      className="text-primary-500 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feat.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MenuPreview() {
  const featured = menuItems.slice(0, 3);
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <h2 className="section-title text-gray-900">Popular Dishes</h2>
          <p className="section-subtitle">
            Discover our most-loved menu items, crafted with care.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((item, index) => (
            <AnimateIn key={item.id} variant="scale-in" delay={index * 100}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover img-hover-zoom"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {formatPrice(item.price)}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn variant="fade-up" delay={200} className="text-center mt-12">
          <Link to="/menu" className="btn-outline inline-flex items-center gap-2">
            View Full Menu <ChevronRight size={18} />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-primary-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary-500 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <h2 className="section-title text-white">What Our Guests Say</h2>
          <p className="section-subtitle text-white/70">
            Hear from the people who make our restaurant special.
          </p>
        </AnimateIn>

        <div className="overflow-hidden mt-12">
          <div className="testimonial-track gap-8">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={index}
                className="w-[min(100%,340px)] sm:w-[380px] flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-secondary-500 fill-secondary-500"
                    />
                  ))}
                </div>
                <p className="text-white/90 leading-relaxed mb-6 italic">
                  &ldquo;{t.review}&rdquo;
                </p>
                <p className="text-white font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateIn variant="scale-in">
          <Clock size={40} className="mx-auto text-primary-500 mb-6" />
          <h2 className="section-title text-gray-900">Ready to Visit?</h2>
          <p className="section-subtitle">
            We&apos;re open seven days a week. Reserve your table or just walk in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${business.phoneHref}`} className="btn-primary">
              Call to Reserve
            </a>
            <Link to="/contact" className="btn-outline">
              Get Directions
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            Open today: {hours[today] || "Check hours"}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

export default function Home() {
  useDocumentTitle("", business.tagline);
  return (
    <main>
      <Hero />
      <Features />
      <MenuPreview />
      <Testimonials />
      <CTASection />
      <LocationMap />
    </main>
  );
}
