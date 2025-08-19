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
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  Eye,
  EyeOff,
  Settings,
  Lock,
  Shield,
  AlertTriangle,
  HelpCircle,
  Database,
  CheckCircle,
  Key,
} from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!requiresTwoFactor) {
      // Simulate checking credentials and requiring 2FA
      setTimeout(() => {
        setRequiresTwoFactor(true);
        setIsLoading(false);
      }, 1000);
    } else {
      // Simulate 2FA verification
      setTimeout(() => {
        setIsLoading(false);
        // In real app, this would authenticate and redirect
        window.location.href = "/admin/dashboard";
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-trust-teal text-white">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">
                  System Administration
                </p>
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
      <div className="bg-trust-teal/10 border-b border-trust-teal/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-trust-teal/70">
              <Link to="/" className="hover:text-trust-teal">Home</Link>
              <span>/</span>
              <span className="text-trust-teal font-medium">Administrator Access</span>
            </div>

            {/* Panel Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-trust-teal/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-trust-teal" />
              </div>
              <span className="text-trust-teal font-semibold">Admin Panel</span>
              <div className="px-2 py-1 bg-trust-teal/20 rounded-full">
                <span className="text-xs text-trust-teal font-medium">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Security Warning */}
        <Alert className="mb-6 border-destructive/20 bg-destructive/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Restricted Access</strong> - This area is limited to
            authorized system administrators only. All access is logged and
            monitored.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-trust-teal/10 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-trust-teal" />
            </div>
            <CardTitle className="text-2xl">Administrator Access</CardTitle>
            <CardDescription>
              Secure system administration and platform management
            </CardDescription>
            <div className="flex justify-center mt-3">
              <Badge className="bg-trust-teal/10 text-trust-teal border-trust-teal/20">
                System Administrator
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Administrator Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ucc.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={requiresTwoFactor}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Use your official administrator account
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={requiresTwoFactor}
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

              {/* Two-Factor Authentication */}
              {requiresTwoFactor && (
                <div className="space-y-2 p-4 bg-trust-teal/5 border border-trust-teal/20 rounded-lg">
                  <Label
                    htmlFor="twoFactorCode"
                    className="flex items-center space-x-2"
                  >
                    <Key className="w-4 h-4" />
                    <span>Two-Factor Authentication Code</span>
                  </Label>
                  <Input
                    id="twoFactorCode"
                    type="text"
                    placeholder="Enter 6-digit code from your authenticator app"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    maxLength={6}
                    required
                    className="w-full font-mono text-center tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground">
                    Check your authenticator app for the current verification
                    code
                  </p>
                </div>
              )}

              {/* Remember Me */}
              {!requiresTwoFactor && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Keep me signed in (not recommended on shared devices)
                  </Label>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-trust-teal hover:bg-trust-teal/90"
                size="lg"
                disabled={
                  (!requiresTwoFactor && (!email || !password)) ||
                  (requiresTwoFactor &&
                    (!twoFactorCode || twoFactorCode.length !== 6)) ||
                  isLoading
                }
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    {requiresTwoFactor ? "Verifying..." : "Authenticating..."}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    {requiresTwoFactor
                      ? "Verify & Access"
                      : "Access Admin Panel"}
                  </>
                )}
              </Button>
            </form>

            {/* Admin Features Overview */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Administrative Tools
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-trust-teal" />
                  <span>System-wide Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-trust-teal" />
                  <span>User Account Management</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-trust-teal" />
                  <span>Platform Configuration</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-trust-teal" />
                  <span>Resource Hub Management</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-trust-teal" />
                  <span>Security & Audit Logs</span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    Administrative Support
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    For technical issues or security concerns, contact the IT
                    Security team immediately.
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs">🔒 security@ucc.edu</p>
                    <p className="text-xs">📞 Emergency: XXX-XXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Compliance */}
            <div className="mt-6 p-4 border border-trust-teal/20 bg-trust-teal/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-trust-teal flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Security & Compliance</h4>
                  <p className="text-xs text-muted-foreground">
                    This system maintains the highest security standards
                    including encryption, audit logging, and compliance with
                    HIPAA, FERPA, and institutional policies.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Warning */}
            <div className="mt-6 p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    Administrator Responsibility
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Unauthorized access attempts are monitored and logged.
                    Administrative privileges must be used responsibly and in
                    accordance with institutional policies.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
