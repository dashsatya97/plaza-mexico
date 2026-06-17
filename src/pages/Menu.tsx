import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  dietaryOptions,
  menuCategories,
  menuItems,
  type DietaryTag,
} from "../data/restaurant";
import { formatPrice } from "../utils/format";
import { useOrder } from "../context/OrderContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import DietaryBadges from "../components/DietaryBadges";
import AnimateIn from "../components/AnimateIn";

// Menu page shows category tabs and filters the menu items based on selection.
export default function MenuPage() {
  useDocumentTitle(
    "Menu",
    "Browse the full Plaza Mexico menu — tacos, burritos, enchiladas, churros and more.",
  );
  const [selected, setSelected] = useState<string[]>(["All"]);
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag[]>([]);
  const tabs = ["All", ...menuCategories];
  const { quantities, addItem, showToast } = useOrder();

  const toggleDiet = (tag: DietaryTag) =>
    setSelectedDiet((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const matchesCategory = (item: (typeof menuItems)[number]) =>
    selected.includes("All") ||
    selected.length === 0 ||
    selected.includes(item.category);

  const matchesDiet = (item: (typeof menuItems)[number]) =>
    selectedDiet.every((tag) => item.tags.includes(tag));

  const filtered = menuItems.filter(
    (item) => matchesCategory(item) && matchesDiet(item),
  );

  return (
    <main className="page-offset">
      <PageHero
        title="Our Menu"
        subtitle="From sizzling tacos to sweet churros, find your favorite dish."
      />

      {/* Menu items section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-side multi-select category filters (responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <AnimateIn variant="slide-right">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm md:sticky md:top-32">
                <h4 className="text-sm font-semibold mb-3">Categories</h4>
                <div className="flex flex-wrap md:flex-col gap-2">
                  {tabs.map((tab) => {
                    const checked = selected.includes(tab);
                    const onChange = () => {
                      if (tab === "All") {
                        setSelected(["All"]);
                        return;
                      }

                      setSelected((prev) => {
                        if (prev.includes(tab)) {
                          const next = prev.filter((p) => p !== tab);
                          return next.length === 0 ? ["All"] : next;
                        }
                        // adding a non-All category removes 'All' if present
                        return [...prev.filter((p) => p !== "All"), tab];
                      });
                    };

                    return (
                      <label
                        key={tab}
                        className="inline-flex items-center gap-2 px-3 py-2.5 min-h-11 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={onChange}
                          className="w-4 h-4 text-primary-500 rounded"
                        />
                        <span className="select-none">{tab}</span>
                      </label>
                    );
                  })}
                </div>

                <h4 className="text-sm font-semibold mt-5 mb-3">Dietary</h4>
                <div className="flex flex-wrap md:flex-col gap-2">
                  {dietaryOptions.map((tag) => {
                    const active = selectedDiet.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleDiet(tag)}
                        aria-pressed={active}
                        className={`inline-flex items-center justify-between gap-2 px-3 py-2.5 min-h-11 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-primary-500 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="select-none">{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              </AnimateIn>
            </aside>

            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((item, index) => {
                  const qty = quantities[item.id] ?? 0;
                  return (
                    <AnimateIn
                      key={item.id}
                      variant="fade-up"
                      delay={(index % 6) * 80}
                    >
                    <div
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 h-full"
                    >
                      <div className="relative h-52 overflow-hidden rounded-t-2xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover img-hover-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-primary-500 px-3 py-1 rounded-full text-sm font-bold">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <DietaryBadges tags={item.tags} className="mb-2" />
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => {
                                addItem(item.id, 1);
                                showToast(`Added ${item.name} to your order`);
                              }}
                              className="btn-outline w-full inline-flex items-center justify-center gap-2 text-sm py-2.5"
                            >
                              <Plus size={16} />
                              Add to order
                            </button>
                          ) : (
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => addItem(item.id, -1)}
                                  className="touch-target rounded-lg border border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
                                  aria-label={`Decrease ${item.name} quantity`}
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="w-8 text-center font-semibold text-gray-900 tabular-nums">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => addItem(item.id, 1)}
                                  className="touch-target rounded-lg border border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
                                  aria-label={`Increase ${item.name} quantity`}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <span className="text-sm font-semibold text-primary-500 tabular-nums">
                                {formatPrice(item.price * qty)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    </AnimateIn>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <p className="text-center text-gray-500 py-12">
                  No items in this category yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
