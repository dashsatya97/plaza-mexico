import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import PageTransition from "./components/PageTransition";
import Toaster from "./components/Toaster";
import BackToTop from "./components/BackToTop";
import OrderModal from "./components/order-modal/OrderModal";
import { OrderProvider } from "./context/OrderContext";

// Route-level code splitting: each page ships in its own chunk so the initial
// bundle stays small and pages load on demand.
const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const CateringPage = lazy(() => import("./pages/Catering"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Root application component that sets up routing and page layout.
function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/catering" element={<CateringPage />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </div>
          <Footer />
        </div>
        <OrderModal />
        <Toaster />
        <BackToTop />
      </OrderProvider>
    </BrowserRouter>
  );
}

export default App;
