import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingParticles from "@/components/FloatingParticles";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { useLanguage } from "@/hooks/useLanguage";
import { Home, Layers, FolderOpen, Mail } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();

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
      
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <FloatingParticles />
        <CursorFollower />
        <FloatingNav
          navItems={navItems}
          ctaLabel={t.navbar.contact}
          ctaHref="mailto:jaquettiweb@gmail.com"
        />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Portfolio />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
