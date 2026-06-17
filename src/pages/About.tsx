import {
  Heart,
  Shield,
  Sun,
  Users,
  Award,
  Leaf,
  BookOpen,
  Phone,
} from "lucide-react";
import { about, business } from "../data/restaurant";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";

// Icon mapping for the values section. Use a default icon when no exact icon exists.
const valueIcons: Record<string, typeof Heart> = {
  Authenticity: Shield,
  Freshness: Sun,
  Hospitality: Heart,
  Community: Users,
};

// About page with story, values, and gallery sections.
export default function AboutPage() {
  useDocumentTitle(
    "About Us",
    `The story, team, and values behind ${business.name}.`,
  );
  return (
    <main className="page-offset">
      <PageHero title="About Us" subtitle={`The story behind ${business.name}`} />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary-600 font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Bringing Mexico to New Haven
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {about.story}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                {about.mission}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/37665166/pexels-photo-37665166.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Chef preparing food"
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-2xl w-full h-56 sm:h-72 md:h-[480px] object-cover"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:-bottom-6 md:-left-6 bg-primary-500 text-white p-4 sm:p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-extrabold">10+</p>
                <p className="text-sm text-white/80">Years Serving</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-gray-900">Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((value) => {
              const Icon = valueIcons[value] || Heart;
              return (
                <div
                  key={value}
                  className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-primary-500 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{value}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-gray-900">Meet Our Team</h2>
          <p className="section-subtitle">
            Passionate chefs and dedicated staff committed to excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Carlos Mendoza",
                role: "Head Chef",
                bio: "With 20+ years of culinary experience, Carlos brings authentic Mexican flavors to every dish.",
                image:
                  "https://images.pexels.com/photos/18117606/pexels-photo-18117606.jpeg?_gl=1*1q8m8fq*_ga*MTM2Mzk0ODcwMi4xNzgxNTAwMjg3*_ga_8JE65Q40S6*czE3ODE1MDAyODYkbzEkZzEkdDE3ODE1MDAzNTgkajU5JGwwJGgw",
              },
              {
                name: "Maria González",
                role: "Executive Chef",
                bio: "Maria specializes in traditional Mexican recipes passed down through generations.",
                image:
                  "https://images.pexels.com/photos/5738073/pexels-photo-5738073.jpeg?_gl=1*gj3qaa*_ga*MTM2Mzk0ODcwMi4xNzgxNTAwMjg3*_ga_8JE65Q40S6*czE3ODE1MDAyODYkbzEkZzEkdDE3ODE1MDA2NTYkajU5JGwwJGgw",
              },
              {
                name: "Diana Rodriguez",
                role: "Pastry Chef",
                bio: "Diana creates delicious authentic churros and traditional Mexican desserts.",
                image:
                  "https://images.pexels.com/photos/31040962/pexels-photo-31040962.jpeg?_gl=1*4bqebh*_ga*MTM2Mzk0ODcwMi4xNzgxNTAwMjg3*_ga_8JE65Q40S6*czE3ODE1MDAyODYkbzEkZzEkdDE3ODE1MDA1OTMkajU5JGwwJGgw",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="text-center group rounded-2xl overflow-hidden bg-gray-50 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-gray-900">Awards & Recognition</h2>
          <p className="section-subtitle">
            Honored for our commitment to quality and authentic Mexican cuisine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                icon: Award,
                title: "Best Mexican Restaurant",
                year: "2023",
                description:
                  "Recognized as the best Mexican restaurant in New Haven by local food critics.",
              },
              {
                icon: Heart,
                title: "Customer Choice Award",
                year: "2023",
                description:
                  "Voted by diners as their favorite authentic Mexican dining experience.",
              },
              {
                icon: Leaf,
                title: "Sustainability Leader",
                year: "2022",
                description:
                  "Committed to using locally-sourced ingredients and sustainable practices.",
              },
              {
                icon: BookOpen,
                title: "Featured in Food Magazine",
                year: "2022",
                description:
                  "Our signature dishes and restaurant story highlighted in regional food publications.",
              },
            ].map((award, idx) => {
              const Icon = award.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-6 p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-secondary-100">
                      <Icon size={28} className="text-secondary-600" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {award.title}
                    </h3>
                    <p className="text-sm text-secondary-600 font-semibold mb-2">
                      {award.year}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community & Sustainability Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/6646874/pexels-photo-6646874.jpeg?_gl=1*1qc4pxv*_ga*MTM2Mzk0ODcwMi4xNzgxNTAwMjg3*_ga_8JE65Q40S6*czE3ODE1MDAyODYkbzEkZzEkdDE3ODE1MDA3MjAkajU5JGwwJGgw"
                alt="Community involvement"
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-2xl w-full h-56 sm:h-72 md:h-[480px] object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-secondary-600 font-semibold text-sm uppercase tracking-wider">
                Community & Sustainability
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Giving Back to Our Community
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                At Plaza Mexico, we believe in supporting our local community.
                We source ingredients from local farmers whenever possible,
                supporting sustainable agriculture and reducing our
                environmental impact.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                We actively participate in community events, sponsor local youth
                programs, and donate a portion of our proceeds to organizations
                that support Mexican cultural heritage and education.
              </p>

              <div className="space-y-4">
                {[
                  "Partner with 15+ local farms for fresh produce",
                  "Sponsor annual Mexican cultural festival",
                  "Support youth culinary programs",
                  "Committed to reducing food waste",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-gray-900 text-center">
            Our Journey
          </h2>
          <p className="section-subtitle text-center">
            From a small dream to a beloved neighborhood restaurant.
          </p>

          <div className="mt-16 space-y-8">
            {[
              {
                year: "2014",
                title: "The Beginning",
                description:
                  "Carlos opens Plaza Mexico with a simple dream: to bring authentic Mexican cuisine to New Haven.",
              },
              {
                year: "2016",
                title: "Expansion",
                description:
                  "Due to overwhelming customer support, we expand our kitchen and add more seating.",
              },
              {
                year: "2018",
                title: "Awards Recognition",
                description:
                  "Recognized as Best Mexican Restaurant by local food critics and publications.",
              },
              {
                year: "2020",
                title: "Catering Services",
                description:
                  "Launch our catering division to bring Plaza Mexico to special events and celebrations.",
              },
              {
                year: "2023",
                title: "Community Hub",
                description:
                  "Become a beloved community gathering place, hosting cooking classes and cultural events.",
              },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  {idx < 4 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-primary-500 to-gray-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-secondary-600 font-semibold text-lg">
                    {milestone.year}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience Plaza Mexico Today
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Visit us and become part of our growing family.
          </p>
          <a href={`tel:${business.phoneHref}`} className="btn-secondary">
            <Phone size={18} className="inline mr-2" />
            Call us now: {business.phone}
          </a>
        </div>
      </section>
    </main>
  );
}
