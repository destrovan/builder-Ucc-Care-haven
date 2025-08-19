import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Lock,
  Shield,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // In real app, this would authenticate and redirect
      window.location.href = "/student/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">Student Login</p>
              </div>
            </Link>

            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Selected Panel Indicator */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary font-semibold">Student Access Panel</span>
            <div className="px-2 py-1 bg-primary/20 rounded-full">
              <span className="text-xs text-primary font-medium">SELECTED</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Privacy Notice */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your login is secure and confidential. We protect your privacy and
            mental health information.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your wellness dashboard and continue your mental
              health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@student.ucc.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>

                <Button
                  variant="link"
                  className="text-sm text-primary p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Registration Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/student/register"
                  className="text-primary hover:underline font-medium"
                >
                  Create a student account
                </Link>
              </p>
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Need help logging in?</h4>
                  <p className="text-xs text-muted-foreground">
                    If you're having trouble accessing your account, contact
                    Student IT Support or visit the campus help desk.
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs">📧 it-support@ucc.edu</p>
                    <p className="text-xs">📞 (XXX) XXX-XXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="mt-6 p-4 border rounded-lg bg-card">
              <div className="text-center space-y-3">
                <h4 className="text-sm font-medium">
                  Prefer to stay anonymous?
                </h4>
                <p className="text-xs text-muted-foreground">
                  You can still access support without creating an account
                </p>
                <Link to="/anonymous-report">
                  <Button variant="outline" size="sm" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Get Anonymous Support
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Alert className="mt-6 border-warning/20 bg-warning/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Emergency?</strong> If you're in immediate danger, call
            Campus Security at (XXX) XXX-XXXX or 988 (Crisis Lifeline).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
