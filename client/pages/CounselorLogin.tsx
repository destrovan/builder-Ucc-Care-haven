import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  UserCheck, 
  Lock,
  Shield,
  AlertCircle,
  HelpCircle,
  Users,
  CheckCircle
} from "lucide-react";

export default function CounselorLogin() {
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
      window.location.href = "/counselor/dashboard";
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
                <p className="text-sm text-muted-foreground">Professional Access</p>
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

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Professional Notice */}
        <Alert className="mb-6 border-hope-green/20 bg-hope-green/5">
          <UserCheck className="h-4 w-4" />
          <AlertDescription>
            <strong>Professional Access Portal</strong> - This area is restricted to licensed mental health counselors and authorized UCC staff.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-hope-green/10 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 text-hope-green" />
            </div>
            <CardTitle className="text-2xl">Counselor Portal</CardTitle>
            <CardDescription>
              Secure access to case management and student support tools
            </CardDescription>
            <div className="flex justify-center mt-3">
              <Badge className="bg-hope-green/10 text-hope-green-foreground border-hope-green/20">
                Professional Staff Only
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Professional Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@ucc.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Use your official UCC counseling department email
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
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Keep me signed in
                  </Label>
                </div>
                
                <Button variant="link" className="text-sm text-primary p-0 h-auto">
                  Reset password
                </Button>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-hope-green hover:bg-hope-green/90" 
                size="lg"
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying credentials...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Access Counselor Portal
                  </>
                )}
              </Button>
            </form>

            {/* Professional Features Overview */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Your Professional Tools
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-hope-green" />
                  <span>Case Management Dashboard</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-hope-green" />
                  <span>Secure Student Communication</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-hope-green" />
                  <span>Report Status Management</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-hope-green" />
                  <span>Private Case Notes</span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Need help accessing your account?</h4>
                  <p className="text-xs text-muted-foreground">
                    Contact the IT Department or your department supervisor for access issues.
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs">📧 counseling-it@ucc.edu</p>
                    <p className="text-xs">📞 Internal: XXX-XXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 border rounded-lg bg-card">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Security & Compliance</h4>
                  <p className="text-xs text-muted-foreground">
                    This system complies with HIPAA, FERPA, and institutional privacy standards. 
                    All access is logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Ethics Reminder */}
            <div className="mt-6 p-4 border border-warning/20 bg-warning/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Professional Responsibility</h4>
                  <p className="text-xs text-muted-foreground">
                    By accessing this system, you agree to maintain professional ethics, 
                    student confidentiality, and follow all institutional guidelines for mental health services.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Protocol */}
        <Alert className="mt-6 border-destructive/20 bg-destructive/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Crisis Protocol:</strong> For immediate student emergencies, follow institutional crisis intervention procedures and contact Campus Security immediately.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
