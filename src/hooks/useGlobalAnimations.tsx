import { useEffect } from "react";

export const useGlobalAnimations = () => {
  useEffect(() => {
    // ---- 1. Scroll Reveal Animation (IntersectionObserver) ----
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const initReveals = () => {
      const revealElements = document.querySelectorAll(".reveal:not(.visible)");

      // Setup staggered delays only for direct .reveal children of .grid containers
      const grids = document.querySelectorAll(".grid");
      grids.forEach((grid) => {
        const children = grid.querySelectorAll(":scope > .reveal, :scope > * > .reveal");
        children.forEach((child, i) => {
          (child as HTMLElement).style.transitionDelay = `${i * 100}ms`;
        });
      });

      revealElements.forEach((el) => revealObserver.observe(el));
    };



    // ---- 3. MutationObserver to catch dynamically rendered .reveal elements ----
    const mutationObserver = new MutationObserver(() => {
      const newReveals = document.querySelectorAll(".reveal:not(.visible)");
      newReveals.forEach((el) => {
        // Check if the observer is already watching this element
        revealObserver.observe(el);
      });
    });

    // Initialize after React finishes rendering
    const timeout = setTimeout(() => {
      initReveals();

      // Watch for new .reveal elements added by React state changes (e.g. tab switches)
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};
