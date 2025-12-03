import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorFollower />
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <Footer />
    </div>
  );
};

export default Index;
