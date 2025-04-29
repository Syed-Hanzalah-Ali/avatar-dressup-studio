
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages 
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const Profile = lazy(() => import("./pages/Profile"));
const Avatar = lazy(() => import("./pages/Avatar"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Customize = lazy(() => import("./pages/Customize"));
const Admin = lazy(() => import("./pages/Admin"));

// Loading Fallback
import LoadingFallback from "@/components/ui/LoadingFallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/avatar" element={<Avatar />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/customize" element={<Customize />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
