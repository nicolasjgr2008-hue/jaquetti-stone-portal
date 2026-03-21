import { Code, TrendingUp, Palette, Pencil, Search, MessageSquare } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const serviceIcons = [Code, TrendingUp, Palette, Pencil, Search, MessageSquare];

const Services = () => {
  const { t } = useLanguage();

  const timelineData = t.services.items.map((service, index) => ({
    id: index + 1,
    title: service.title,
    date: "",
    content: service.description,
    category: service.title,
    icon: serviceIcons[index] || Code,
    relatedIds: [
      index > 0 ? index : t.services.items.length,
      index < t.services.items.length - 1 ? index + 2 : 1,
    ],
    status: "completed" as const,
    energy: Math.round(100 - index * 10),
  }));

  return (
    <section id="solucoes" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 space-y-4">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            {t.services.title1}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            {t.services.title2}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
        </AnimatedSection>

        {/* Radial Orbital Timeline */}
        <RadialOrbitalTimeline timelineData={timelineData} />

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-8">
          <a
            href="mailto:jaquettiweb@gmail.com"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {t.services.cta}
            <span>→</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
