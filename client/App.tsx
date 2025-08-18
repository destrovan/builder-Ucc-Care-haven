import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/StudentDashboard";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Student Routes */}
          <Route path="/student/login" element={
            <PlaceholderPage
              title="Student Login"
              description="Secure login for registered students to access their wellness dashboard"
            />
          } />
          <Route path="/student/register" element={
            <PlaceholderPage
              title="Student Registration"
              description="Create a new student account to start your wellness journey"
            />
          } />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* Counselor Routes */}
          <Route path="/counselor/login" element={
            <PlaceholderPage
              title="Counselor Login"
              description="Secure access for professional counselors to manage student cases"
            />
          } />
          <Route path="/counselor/dashboard" element={
            <PlaceholderPage
              title="Counselor Dashboard"
              description="Case management interface for mental health professionals"
            />
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <PlaceholderPage
              title="Administrator Login"
              description="System administration and platform management access"
            />
          } />
          <Route path="/admin/dashboard" element={
            <PlaceholderPage
              title="Admin Dashboard"
              description="System-wide analytics and user management interface"
            />
          } />

          {/* Support & Reporting Routes */}
          <Route path="/anonymous-report" element={
            <PlaceholderPage
              title="Anonymous Support"
              description="Confidential reporting for students who prefer to remain anonymous"
            />
          } />
          <Route path="/report" element={
            <PlaceholderPage
              title="Student Support Request"
              description="Submit a confidential report to connect with counseling services"
            />
          } />
          <Route path="/report-status" element={
            <PlaceholderPage
              title="Report Status"
              description="Check the status of your submitted support request using your tracking ID"
            />
          } />

          {/* Resources */}
          <Route path="/resources" element={
            <PlaceholderPage
              title="Resource Hub"
              description="Browse our library of mental health resources, articles, and wellness tools"
            />
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
