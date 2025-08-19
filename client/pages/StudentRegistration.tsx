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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  Eye,
  EyeOff,
  UserPlus,
  Shield,
  Check,
  AlertCircle,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    phone: "",
    year: "",
    program: "",
    emergencyContact: "",
    emergencyPhone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
    consentCounseling: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.studentId &&
      formData.year &&
      formData.program
    );
  };

  const validateStep2 = () => {
    return formData.emergencyContact && formData.emergencyPhone;
  };

  const validateStep3 = () => {
    return (
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8 &&
      formData.agreeTerms &&
      formData.agreePrivacy &&
      formData.consentCounseling
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // In real app, this would create account and redirect
      window.location.href = "/student/dashboard";
    }, 2000);
  };

  const progress = (step / 3) * 100;

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
                <p className="text-sm text-muted-foreground">
                  Student Registration
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
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-primary/70">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span className="text-primary font-medium">Student Registration</span>
            </div>

            {/* Panel Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-semibold">Student Panel</span>
              <div className="px-2 py-1 bg-primary/20 rounded-full">
                <span className="text-xs text-primary font-medium">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Privacy Notice */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your information is secure and confidential. We only collect what's
            necessary to provide you with mental health support.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Join UCC Care</CardTitle>
            <CardDescription>
              Create your account to access confidential mental health support
              and wellness resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Personal & Academic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Student Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="your.email@student.ucc.edu"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID *</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) =>
                        updateFormData("studentId", e.target.value)
                      }
                      placeholder="Enter your student ID"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="(XXX) XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Academic Year *</Label>
                    <Select
                      value={formData.year}
                      onValueChange={(value) => updateFormData("year", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Year</SelectItem>
                        <SelectItem value="second">Second Year</SelectItem>
                        <SelectItem value="third">Third Year</SelectItem>
                        <SelectItem value="fourth">Fourth Year</SelectItem>
                        <SelectItem value="graduate">
                          Graduate Student
                        </SelectItem>
                        <SelectItem value="postgrad">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program">Program/Major *</Label>
                    <Input
                      id="program"
                      value={formData.program}
                      onChange={(e) =>
                        updateFormData("program", e.target.value)
                      }
                      placeholder="e.g., Computer Science, Psychology"
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={!validateStep1()}
                >
                  Continue to Emergency Contact
                </Button>
              </div>
            )}

            {/* Step 2: Emergency Contact */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Contact Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  This information is kept confidential and only used in case of
                  emergency situations.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">
                    Emergency Contact Name *
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      updateFormData("emergencyContact", e.target.value)
                    }
                    placeholder="Full name of emergency contact"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">
                    Emergency Contact Phone *
                  </Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) =>
                      updateFormData("emergencyPhone", e.target.value)
                    }
                    placeholder="(XXX) XXX-XXXX"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1"
                    disabled={!validateStep2()}
                  >
                    Continue to Security
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Security & Consent */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security & Privacy Consent
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="password">Create Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                      placeholder="Create a secure password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateFormData("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm your password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-destructive">
                        Passwords do not match
                      </p>
                    )}
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        updateFormData("agreeTerms", checked)
                      }
                    />
                    <Label
                      htmlFor="agreeTerms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and understand the platform guidelines *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) =>
                        updateFormData("agreePrivacy", checked)
                      }
                    />
                    <Label
                      htmlFor="agreePrivacy"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I acknowledge the{" "}
                      <Link
                        to="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and consent to data processing for mental health support *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consentCounseling"
                      checked={formData.consentCounseling}
                      onCheckedChange={(checked) =>
                        updateFormData("consentCounseling", checked)
                      }
                    />
                    <Label
                      htmlFor="consentCounseling"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I consent to receiving mental health counseling and
                      support through this platform *
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1"
                    disabled={!validateStep3() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/student/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
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
