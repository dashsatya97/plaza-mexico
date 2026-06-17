import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/** Subtle fade-and-rise when navigating between routes. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="animate-page-enter flex-1 flex flex-col">
      {children}
    </div>
  );
}
