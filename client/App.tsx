import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/StudentDashboard";
import StudentLogin from "./pages/StudentLogin";
import StudentRegistration from "./pages/StudentRegistration";
import CounselorLogin from "./pages/CounselorLogin";
import CounselorDashboard from "./pages/CounselorDashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import AnonymousReport from "./pages/AnonymousReport";
import AuthenticatedReport from "./pages/AuthenticatedReport";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Student Routes */}
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegistration />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />

            {/* Counselor Routes */}
            <Route path="/counselor/login" element={<CounselorLogin />} />
            <Route path="/counselor/dashboard" element={<CounselorDashboard />} />

            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <PlaceholderPage
                  title="Administrator Login"
                  description="System administration and platform management access"
                />
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PlaceholderPage
                  title="Admin Dashboard"
                  description="System-wide analytics and user management interface"
                />
              }
            />

            {/* Support & Reporting Routes */}
            <Route path="/anonymous-report" element={<AnonymousReport />} />
            <Route path="/report" element={<AuthenticatedReport />} />
            <Route
              path="/report-status"
              element={
                <PlaceholderPage
                  title="Report Status"
                  description="Check the status of your submitted support request using your tracking ID"
                />
              }
            />

            {/* Resources */}
            <Route
              path="/resources"
              element={
                <PlaceholderPage
                  title="Resource Hub"
                  description="Browse our library of mental health resources, articles, and wellness tools"
                />
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
