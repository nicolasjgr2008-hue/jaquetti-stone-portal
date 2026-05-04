import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import Case from "./pages/Case";
import CaseCSAPET from "./pages/CaseCSAPET";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { CustomCursor } from "./components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { PageTransition } from "./components/PageTransition";
import ExitIntent from "./components/ExitIntent";
import { Analytics } from "./components/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <NoiseOverlay />
          <CustomCursor />
          <ExitIntent />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Analytics />
            <PageTransition />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/case/csapet" element={<CaseCSAPET />} />
              <Route path="/case/:id" element={<Case />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingWhatsApp />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
