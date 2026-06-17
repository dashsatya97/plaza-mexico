import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { business, navigation } from "../data/restaurant";
import { useOrder } from "../context/OrderContext";
import logo from "../assets/plaza-mexico-logo.png";

// Header component contains the site brand, navigation links, and mobile menu.
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openOrder } = useOrder();
  const location = useLocation();

  const openOrderModal = () => {
    setIsOpen(false);
    openOrder();
  };

  const isHomePage = location.pathname === "/";
  const lightHeader = scrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 safe-top safe-x transition-all duration-300 ${
        lightHeader
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 lg:gap-4 h-20 lg:h-28">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="relative z-10 flex items-center gap-2 sm:gap-3 group min-w-0 max-w-[45vw] lg:max-w-none"
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-colors ${
                lightHeader ? "bg-primary-500" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <img
                src={logo}
                alt="Plaza Mexico"
                className="w-full h-full object-contain"
              />
            </div>

            <span
              className={`hidden xl:inline text-base lg:text-lg xl:text-xl font-bold truncate transition-colors ${
                lightHeader ? "text-primary-500" : "text-white"
              }`}
            >
              {business.name}
            </span>
          </Link>

          <nav
            className="hidden lg:flex justify-center items-center gap-0.5 xl:gap-1 min-w-0 px-1"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : lightHeader
                        ? "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center justify-end gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={openOrderModal}
              className={`touch-target relative rounded-lg transition-colors ${
                lightHeader
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={
                totalCount > 0
                  ? `View order, ${totalCount} item${totalCount === 1 ? "" : "s"}`
                  : "View order"
              }
            >
              <ShoppingBag size={22} />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-secondary-500 px-1 text-xs font-bold text-white">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openOrderModal}
              className="btn-primary hidden lg:inline-flex text-xs xl:text-sm px-4 xl:px-5 py-2.5 whitespace-nowrap"
            >
              Order now!
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`touch-target lg:hidden rounded-lg transition-colors ${
                lightHeader
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[calc(100dvh-5rem)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`bg-white shadow-xl border-t safe-bottom ${isOpen ? "animate-fade-in-down" : ""}`}
        >
          <div className="px-4 py-3 space-y-1 max-h-[calc(100dvh-5rem)] overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : "text-gray-700 hover:bg-primary-50 hover:text-primary-500"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={openOrderModal}
              className="block w-full mt-2 px-4 py-3.5 rounded-lg text-base font-semibold text-center bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              Order now!
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
