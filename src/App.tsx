import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Preloader } from "@/components/Preloader";

// Pages
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse">
      <div className="w-12 h-12 rounded-full border-4 border-muted-foreground/30 border-t-accent"></div>
    </div>
  </div>
);

const queryClient = new QueryClient();

// Scroll to top component
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);
  
  return null;
}

// Main App Content (rendered after preloader)
function AppContent() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<Rooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/reviews" element={<Index />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Preloader 
                key="preloader"
                onLoadComplete={() => setIsLoading(false)} 
                minDisplayTime={3000}
              />
            ) : (
              <AppContent key="app-content" />
            )}
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
