import { useEffect } from "react";
import { business } from "../data/restaurant";

/**
 * Sets the document title (and optionally the meta description) for a page,
 * restoring the previous title when the component unmounts. Keeps per-route
 * SEO correct without pulling in a heavier helmet-style dependency.
 */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${business.name}` : business.name;

    let previousDescription: string | null = null;
    let metaEl: HTMLMetaElement | null = null;

    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      if (metaEl) {
        previousDescription = metaEl.getAttribute("content");
        metaEl.setAttribute("content", description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaEl && previousDescription !== null) {
        metaEl.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
