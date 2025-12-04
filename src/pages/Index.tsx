import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Jaquetti Web Agency | Criação de Sites Profissionais e Marketing Digital</title>
        <meta name="description" content="Agência especializada em criação de sites profissionais, SEO, identidade visual, tráfego pago e marketing digital. Transforme sua presença online e aumente suas vendas." />
        <link rel="canonical" href="https://jaquettiweb.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <CursorFollower />
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
