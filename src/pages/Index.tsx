import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Services = lazy(() => import("@/components/Services"));
const Stats = lazy(() => import("@/components/Stats"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingParticles from "@/components/FloatingParticles";
import { FloatingNav } from "@/components/ui/floating-navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { Layers, FolderOpen } from "lucide-react";
import TopBanner from "@/components/TopBanner";
const FAQ = lazy(() => import("@/components/FAQ"));
import { Analytics } from "@/components/Analytics";
import { useGlobalAnimations } from "@/hooks/useGlobalAnimations";

const Index = () => {
  const { t } = useLanguage();
  useGlobalAnimations();

  const navItems = [
    { name: t.navbar.solutions, link: "#solucoes", icon: <Layers className="w-4 h-4" /> },
    { name: t.navbar.cases, link: "#cases", icon: <FolderOpen className="w-4 h-4" /> },
  ];

  return (
    <>
      <Helmet>
        <title>Jaquetti Web Agency | Criação de Sites Profissionais e Marketing Digital</title>
        <meta name="description" content="Agência especializada em criação de sites profissionais, SEO, identidade visual, tráfego pago e marketing digital. Transforme sua presença online e aumente suas vendas." />
        <link rel="canonical" href="https://jaquettiweb.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Analytics />
        <TopBanner />
        <ScrollProgress />
        <FloatingParticles />
        <CursorFollower />
        <FloatingNav
          navItems={navItems}
          brandName="Jaquetti"
          ctaLabel={t.navbar.contact}
          ctaHref="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto"
        />
        {/* Language switcher fixed position */}
        <div className="fixed top-7 right-6 z-[5001]">
          <LanguageSwitcher />
        </div>
        <main>
          <Hero />
          <Suspense fallback={<div className="h-screen bg-background" />}>
            <Stats />
            <Services />
            <Portfolio />
            <FAQ />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
