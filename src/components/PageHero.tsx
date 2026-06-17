import type { ReactNode } from "react";
import AnimateIn from "./AnimateIn";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/**
 * Shared banner used at the top of inner pages (Menu, About, Gallery, etc.).
 * Keeps the hero markup in one place instead of being copy-pasted per page.
 */
export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-primary-500 overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-secondary-500 rounded-full blur-3xl animate-fade-in" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-fade-in" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimateIn immediate variant="fade-down" delay={0}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
            {title}
          </h1>
        </AnimateIn>
        {subtitle && (
          <AnimateIn immediate variant="fade-up" delay={120}>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-2">
              {subtitle}
            </p>
          </AnimateIn>
        )}
        {children && (
          <AnimateIn immediate variant="fade-up" delay={220}>
            {children}
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
