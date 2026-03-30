import { useEffect } from "react";

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
  useEffect(() => {
    let scrolled50 = false;
    
    const trackEvent = (eventName: string, source?: string) => {
      // 1. Google Analytics 4 (dataLayer)
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ 
          event: eventName, 
          source: source || 'unknown' 
        });
      }
      
      // 2. Meta Pixel (fbq)
      if (typeof window !== 'undefined' && window.fbq) {
        if (eventName === 'whatsapp_click') {
           window.fbq('track', 'Contact', { source });
        } else if (eventName === 'scroll_50_percent') {
           window.fbq('trackCustom', 'ViewContent');
        } else if (eventName === 'form_submit') {
           window.fbq('track', 'Lead');
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
