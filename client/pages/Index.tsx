import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Users,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Lock,
  User,
  UserCheck,
  Settings,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
      {/* Header Navigation */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">
                  Student Mental Health & Wellness
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#resources"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Resources
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-comfort-lavender text-comfort-lavender-foreground">
            Confidential • Secure • Supportive
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Mental Health
            <span className="text-primary block">Matters</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            UCC Care provides a safe, confidential platform for students to
            access mental health support, track their wellness journey, and
            connect with professional counselors.
          </p>

          {/* Emergency Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-warning-foreground">
              <Phone className="w-5 h-5" />
              <p className="font-medium">
                Crisis Support: Call 988 (Suicide & Crisis Lifeline) - Available
                24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Role Access Cards */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">
          Choose Your Access Level
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Student Access */}
          <Card className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary group-hover:h-2 transition-all duration-300"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Students</CardTitle>
              <CardDescription>
                Access your personal wellness dashboard, mood tracking, and
                confidential support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-hope-green" />
                  <span className="text-sm">Mood Tracking & Journaling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Confidential Reporting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-trust-teal" />
                  <span className="text-sm">Resource Library Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                  <span className="text-sm">Anonymous Options Available</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Link to="/student/login">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Student Login
                  </Button>
                </Link>
                <Link to="/student/register">
                  <Button variant="outline" className="w-full">
                    Create Student Account
                  </Button>
                </Link>
                <Link to="/anonymous-report">
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground"
                  >
                    Anonymous Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Counselor Access */}
          <Card className="relative overflow-hidden border-hope-green/40 hover:border-hope-green/60 transition-all duration-300 hover:shadow-lg hover:shadow-hope-green/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-hope-green group-hover:h-2 transition-all duration-300"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-hope-green/10 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-hope-green" />
              </div>
              <CardTitle className="text-2xl">Counselors</CardTitle>
              <CardDescription>
                Manage cases, communicate with students, and provide
                professional support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Case Management Dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-hope-green" />
                  <span className="text-sm">Secure Student Communication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-trust-teal" />
                  <span className="text-sm">Report Status Tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-accent-foreground" />
                  <span className="text-sm">Private Notes & Updates</span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/counselor/login">
                  <Button className="w-full bg-hope-green text-white hover:bg-hope-green/90">
                    Counselor Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Admin Access */}
          <Card className="relative overflow-hidden border-trust-teal/40 hover:border-trust-teal/60 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-trust-teal"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-trust-teal/10 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-trust-teal" />
              </div>
              <CardTitle className="text-2xl">Administrators</CardTitle>
              <CardDescription>
                System oversight, user management, and platform configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm">System-wide Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-trust-teal" />
                  <span className="text-sm">User Account Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-hope-green" />
                  <span className="text-sm">Resource Hub Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-accent-foreground" />
                  <span className="text-sm">Platform Configuration</span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/admin/login">
                  <Button className="w-full bg-trust-teal text-white hover:bg-trust-teal/90">
                    Admin Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="services" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Mental Health Support
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Confidential & Secure
              </h4>
              <p className="text-muted-foreground text-sm">
                End-to-end encryption and strict privacy protocols protect your
                information
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-hope-green/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-hope-green" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Mood Tracking</h4>
              <p className="text-muted-foreground text-sm">
                Monitor your emotional wellbeing with daily mood logs and
                insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-trust-teal/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-trust-teal" />
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Professional Support
              </h4>
              <p className="text-muted-foreground text-sm">
                Connect with qualified counselors for personalized guidance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-comfort-lavender/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Resource Library</h4>
              <p className="text-muted-foreground text-sm">
                Access curated articles, videos, and wellness resources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold">UCC Care</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Supporting student mental health and wellness through technology
                and compassionate care.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Emergency Resources</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Crisis Line: 988</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Campus Security: (XXX) XXX-XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>crisis@ucc.edu</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support Hours</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Emergency support available 24/7</p>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 UCC Care. All rights reserved. | Privacy Policy |
              Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
