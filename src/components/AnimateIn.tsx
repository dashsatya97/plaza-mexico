import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

export type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "fade-down"
  | "scale-in"
  | "slide-right";

const variantClass: Record<AnimationVariant, string> = {
  "fade-up": "animate-fade-in-up",
  "fade-in": "animate-fade-in",
  "fade-down": "animate-fade-in-down",
  "scale-in": "animate-scale-in",
  "slide-right": "animate-slide-in-right",
};

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  /** Stagger delay in milliseconds. */
  delay?: number;
  duration?: number;
  /** Play on mount instead of waiting for scroll (hero / above-the-fold). */
  immediate?: boolean;
  once?: boolean;
};

/**
 * Scroll-triggered (or immediate) entrance animation. Respects
 * prefers-reduced-motion via global CSS overrides.
 */
export default function AnimateIn({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration,
  immediate = false,
  once = true,
}: AnimateInProps) {
  const { ref, inView } = useInView({ immediate, once });

  const style: CSSProperties = {
    animationDelay: delay ? `${delay}ms` : undefined,
    animationDuration: duration ? `${duration}ms` : undefined,
  };

  return (
    <div
      ref={ref}
      className={`${inView ? variantClass[variant] : "opacity-0"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
