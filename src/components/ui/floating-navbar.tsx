"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  ctaLabel,
  ctaHref,
  brandName,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  ctaLabel?: string;
  ctaHref?: string;
  brandName?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        const offset = el.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-border/20 rounded-full bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] z-[5000] pr-2 pl-6 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {brandName && (
          <a
            href="/"
            className="text-sm font-serif font-bold text-foreground tracking-tight pr-2 border-r border-border/20 mr-1"
          >
            {brandName}
          </a>
        )}
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            onClick={(e) => handleClick(e, navItem.link)}
            className="relative text-muted-foreground items-center flex space-x-1 hover:text-foreground transition-colors duration-300"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-xs tracking-wide">{navItem.name}</span>
          </a>
        ))}
        {ctaLabel && (
          <a
            href={ctaHref || "#"}
            className="border text-xs font-medium relative border-border/30 text-foreground px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <span>{ctaLabel}</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
