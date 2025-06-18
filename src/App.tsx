import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assuming a generic Homepage exists or will be added later
// For now, if no specific homepage is defined, this will be the entry point.
// If you have a specific Homepage component, import it here.
// For example: import Homepage from "./pages/Homepage"; 

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LegalDocumentPage from "./pages/LegalDocumentPage";
import SignupSuccessPage from "./pages/SignupSuccessPage";
import NotFound from "./pages/NotFound"; // Always Must Include

const queryClient = new QueryClient();

// Placeholder for a Homepage if one isn't explicitly part of this request
const PlaceholderHomepage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-3xl font-bold">Welcome</h1>
    <p className="mt-2">This is a placeholder homepage.</p>
    <nav className="mt-4 space-x-2">
      <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
    </nav>
  </div>
);


const App = () => {
  console.log('App.tsx loaded');
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route to a placeholder or your actual Homepage */}
          <Route path="/" element={<PlaceholderHomepage />} /> 
          {/* <Route path="/" element={<Homepage />} /> Uncomment if you have a Homepage.tsx */}
          
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/legal/:documentType" element={<LegalDocumentPage />} />
          <Route path="/signup-success" element={<SignupSuccessPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;