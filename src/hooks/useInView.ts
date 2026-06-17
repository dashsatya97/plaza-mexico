import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Skip the observer and treat the element as visible immediately. */
  immediate?: boolean;
  /** Only trigger once (default true). */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useInView({
  immediate = false,
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, once, threshold, rootMargin]);

  return { ref, inView };
}
