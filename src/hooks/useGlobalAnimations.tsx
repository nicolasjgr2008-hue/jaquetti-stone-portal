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

    // ---- 2. Title Parallax (scroll listener, not on Hero) ----
    const parallaxEls: HTMLElement[] = [];

    const initParallax = () => {
      // Only target section-level h2 headings that are NOT inside the hero
      const titles = document.querySelectorAll(
        "section:not(:first-of-type) > .container h2"
      );
      titles.forEach((title) => {
        const el = title as HTMLElement;
        const computed = window.getComputedStyle(el);
        if (computed.position !== "fixed" && computed.position !== "sticky") {
          // Mark element so parallax doesn't conflict with reveal
          el.dataset.parallax = "true";
          parallaxEls.push(el);
        }
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Use translate that won't conflict with .reveal.visible (which resets translateY(0))
          // Only apply parallax if element is already visible
          if (el.classList.contains("visible") || !el.classList.contains("reveal")) {
            el.style.transform = `translateY(${scrolled * 0.08}px)`;
          }
        }
      });
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
      initParallax();
      window.addEventListener("scroll", handleScroll, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
