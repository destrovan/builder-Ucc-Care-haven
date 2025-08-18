import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Shield, 
  ArrowLeft, 
  Send, 
  Lock,
  AlertTriangle,
  CheckCircle,
  Copy,
  Phone,
  MessageCircle
} from "lucide-react";

interface ConfidentialReportProps {
  isAnonymous?: boolean;
}

export default function ConfidentialReport({ isAnonymous = false }: ConfidentialReportProps) {
  const [urgency, setUrgency] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId] = useState("UCC-CARE-" + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [consent, setConsent] = useState(false);
  const [contactPreference, setContactPreference] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would submit to API
    setIsSubmitted(true);
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">Support Request Submitted</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="border-success/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">Report Submitted Successfully</CardTitle>
              <CardDescription>
                Your confidential support request has been received and will be reviewed by our professional counseling team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tracking ID */}
              <div className="bg-muted/30 rounded-lg p-4">
                <Label className="text-sm font-medium">Your Tracking ID</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <code className="flex-1 bg-background px-3 py-2 rounded border font-mono text-sm">
                    {trackingId}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyTrackingId}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Save this ID to check your report status and view counselor responses. Keep it private and secure.
                </p>
              </div>

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Review Process</p>
                      <p className="text-xs text-muted-foreground">
                        A qualified counselor will review your request within 24 hours (or immediately for urgent cases).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Counselor Response</p>
                      <p className="text-xs text-muted-foreground">
                        You'll receive an initial response with guidance and next steps for support.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ongoing Support</p>
                      <p className="text-xs text-muted-foreground">
                        Continue the conversation and receive professional guidance through our secure platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Resources */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>If this is an emergency:</strong> Contact Campus Security immediately at (XXX) XXX-XXXX or call 988 (Suicide & Crisis Lifeline) for immediate support.
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" asChild>
                  <Link to="/report-status">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Check Status
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">
                  {isAnonymous ? "Anonymous Support Request" : "Confidential Support Request"}
                </p>
              </div>
            </div>
            
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Privacy Notice */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Your privacy is protected.</strong> This form is confidential and secure. 
            {isAnonymous ? " No personal information is required." : " Your information is only shared with qualified counselors."}
          </AlertDescription>
        </Alert>

        {/* Emergency Notice */}
        <Alert className="mb-6 border-warning/20 bg-warning/5">
          <Phone className="h-4 w-4" />
          <AlertDescription>
            <strong>Emergency?</strong> If you're in immediate danger, call Campus Security at (XXX) XXX-XXXX or 988 (Crisis Lifeline) for immediate help.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>Confidential Support Request</span>
            </CardTitle>
            <CardDescription>
              Share what's on your mind. Our trained counselors are here to help and support you through any challenges you're facing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Urgency Level */}
              <div className="space-y-3">
                <Label className="text-base font-medium">How urgent is your situation?</Label>
                <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Low - General guidance or support</span>
                        <Badge variant="outline" className="text-green-600 border-green-200">Low Priority</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Response within 48-72 hours
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Medium - Need support soon</span>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-200">Medium Priority</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Response within 24 hours
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>High - Need immediate support</span>
                        <Badge variant="outline" className="text-red-600 border-red-200">High Priority</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Response within 2-4 hours during business hours
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Contact Preference (only for non-anonymous) */}
              {!isAnonymous && (
                <div className="space-y-3">
                  <Label className="text-base font-medium">How would you prefer to be contacted?</Label>
                  <RadioGroup value={contactPreference} onValueChange={setContactPreference} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="platform" id="platform" />
                      <Label htmlFor="platform" className="cursor-pointer">
                        Through this platform (recommended)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="cursor-pointer">
                        Email to my student account
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone" className="cursor-pointer">
                        Phone call (provide number in description)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">
                  Tell us what's happening
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share what's on your mind. You can describe your situation, feelings, challenges, or any specific support you're looking for. Remember, this is a safe and confidential space."
                  className="min-h-[120px] resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Be as detailed as you feel comfortable. The more information you provide, the better we can support you.
                </p>
              </div>

              {/* Consent */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="consent" 
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    I understand that this information will be reviewed by qualified mental health professionals at UCC. 
                    I consent to receiving support and guidance through this platform. 
                    {!isAnonymous && " I understand that my identity will be kept confidential and only shared with my assigned counselor."}
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!urgency || !description.trim() || !consent}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Confidential Report
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                After submission, you'll receive a unique tracking ID to check your report status and view counselor responses.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
