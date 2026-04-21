import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Easily replaceable IDs
const PIXEL_ID = "1213331447225251";
const GA4_ID = "G-EBZLX0G9B4";

declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
    gtag: (...args: any[]) => void;
  }
}

export const Analytics = () => {
  const location = useLocation();
  const engagementStartRef = useRef<number>(Date.now());
  const accumulatedEngagementRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // Track SPA route changes as page_view
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  // Engagement tracking: visibility + heartbeat + flush on hide/unload
  useEffect(() => {
    const flushEngagement = () => {
      if (isVisibleRef.current) {
        accumulatedEngagementRef.current += Date.now() - engagementStartRef.current;
        engagementStartRef.current = Date.now();
      }
      const ms = accumulatedEngagementRef.current;
      if (ms > 0 && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'user_engagement', {
          engagement_time_msec: ms,
          page_path: window.location.pathname,
        });
        accumulatedEngagementRef.current = 0;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (isVisibleRef.current) {
          accumulatedEngagementRef.current += Date.now() - engagementStartRef.current;
          isVisibleRef.current = false;
        }
        flushEngagement();
      } else {
        isVisibleRef.current = true;
        engagementStartRef.current = Date.now();
      }
    };

    // Heartbeat every 15s to keep GA4 engagement metric fresh
    const heartbeat = window.setInterval(flushEngagement, 15000);

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', flushEngagement);
    window.addEventListener('beforeunload', flushEngagement);

    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', flushEngagement);
      window.removeEventListener('beforeunload', flushEngagement);
      flushEngagement();
    };
  }, []);

  useEffect(() => {
    let scrolled50 = false;

    // Capture UTM variant once — used in all event payloads below
    const utmVariant =
      new URLSearchParams(window.location.search).get('utm_content') ||
      new URLSearchParams(window.location.search).get('utm_campaign') ||
      'direct';

    const trackEvent = (eventName: string, source?: string) => {
      // 1. Google Analytics 4 (dataLayer)
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          source: source || 'unknown',
          utm_variant: utmVariant,
        });
      }
      
      // 2. Meta Pixel (fbq)
      if (typeof window !== 'undefined' && window.fbq) {
        if (eventName === 'whatsapp_click') {
           window.fbq('track', 'Contact', { source, utm_variant: utmVariant });
           window.fbq('trackCustom', 'CTAClick', { source, utm_variant: utmVariant });
        } else if (eventName === 'scroll_50_percent') {
           window.fbq('trackCustom', 'ViewContent');
        } else if (eventName === 'form_submit') {
           window.fbq('track', 'Lead', { utm_variant: utmVariant });
        }
      }
      
      console.log(`[Analytics] Tracked: ${eventName}`, source ? {source} : '');
    };

    let ticking = false;
    let rid: number;
    const handleScroll = () => {
      if (!ticking && !scrolled50) {
        rid = requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0 && (scrolled / totalHeight) >= 0.5) {
            scrolled50 = true;
            trackEvent('scroll_50_percent');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href.includes('wa.me')) {
        // Look for explicit data-source, or infer from closest section ID
        let source = link.getAttribute('data-source');
        if (!source) {
          const section = link.closest('section');
          source = section ? `cta_${section.id}` : 'cta_generic';
        }
        trackEvent('whatsapp_click', source);
      }
      
      const form = target.closest('form');
      if (form && e.type === 'submit') {
        trackEvent('form_submit');
      }
    };

    // Attach native DOM listeners globally
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Using capturing phase to ensure intercept fires before navigation
    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleClick, true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleClick, true);
    };
  }, []);

  return null;
};
