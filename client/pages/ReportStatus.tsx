import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Heart, 
  ArrowLeft, 
  Search,
  Shield,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  User,
  Eye,
  Copy,
  Phone
} from "lucide-react";

export default function ReportStatus() {
  const [trackingId, setTrackingId] = useState("");
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data for demo - in real app this would come from API
  const mockReportData = {
    id: "UCC-CARE-A8K9J2",
    status: "in_progress",
    priority: "medium",
    submittedAt: "2024-01-15T14:30:00Z",
    lastUpdate: "2024-01-16T10:15:00Z",
    counselor: "Dr. Sarah Chen",
    isAnonymous: true,
    updates: [
      {
        id: "1",
        timestamp: "2024-01-15T14:30:00Z",
        type: "submitted",
        message: "Your support request has been received and is being reviewed by our professional team."
      },
      {
        id: "2",
        timestamp: "2024-01-15T18:45:00Z",
        type: "assigned",
        message: "Your case has been assigned to a qualified counselor who will review your situation."
      },
      {
        id: "3",
        timestamp: "2024-01-16T10:15:00Z",
        type: "response",
        message: "Thank you for reaching out. I understand you're experiencing anxiety about upcoming exams. This is very common and there are effective strategies we can work on together. I've prepared some initial resources and would like to schedule a follow-up conversation. Please let me know your preferred time for contact.",
        author: "Dr. Sarah Chen"
      }
    ]
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (trackingId === "UCC-CARE-A8K9J2" || trackingId === "ucc-care-a8k9j2") {
        setReportData(mockReportData);
      } else {
        setError("Report not found. Please check your tracking ID and try again.");
        setReportData(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'resolved': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'urgent': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'submitted': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'assigned': return <User className="w-4 h-4 text-orange-600" />;
      case 'response': return <MessageCircle className="w-4 h-4 text-green-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const copyTrackingId = () => {
    if (reportData) {
      navigator.clipboard.writeText(reportData.id);
    }
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
                <p className="text-sm text-muted-foreground">Report Status Tracking</p>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Privacy Notice */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your tracking ID keeps your report confidential and secure. Never share your tracking ID with others.
          </AlertDescription>
        </Alert>

        {/* Search Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Track Your Support Request</CardTitle>
            <CardDescription>
              Enter your unique tracking ID to view the status of your confidential support request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="trackingId"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="UCC-CARE-XXXXXXX"
                    className="font-mono"
                    required
                  />
                  <Button type="submit" disabled={!trackingId.trim() || isLoading}>
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your tracking ID was provided when you submitted your support request
                </p>
              </div>
            </form>

            {/* Demo Helper */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Demo:</strong> Try using tracking ID: <code className="bg-background px-2 py-1 rounded text-primary">UCC-CARE-A8K9J2</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 border-destructive/20 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Report Details */}
        {reportData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Support Request Details</span>
                    </CardTitle>
                    <CardDescription>Track the progress of your confidential support request</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-3 py-1 rounded text-sm">{reportData.id}</code>
                    <Button variant="ghost" size="sm" onClick={copyTrackingId}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Current Status</Label>
                      <div className="mt-1">
                        <Badge className={getStatusColor(reportData.status)}>
                          {reportData.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Priority Level</Label>
                      <div className="mt-1">
                        <Badge className={getPriorityColor(reportData.priority)}>
                          {reportData.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Submitted</Label>
                      <p className="text-sm mt-1">{formatDate(reportData.submittedAt)}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Last Update</Label>
                      <p className="text-sm mt-1">{formatDate(reportData.lastUpdate)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Assigned Counselor</Label>
                      <p className="text-sm mt-1">{reportData.counselor}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Submission Type</Label>
                      <p className="text-sm mt-1">
                        {reportData.isAnonymous ? 'Anonymous' : 'Authenticated'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Communication Timeline</span>
                </CardTitle>
                <CardDescription>
                  Updates and responses from your counselor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reportData.updates.map((update: any, index: number) => (
                    <div key={update.id} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          {getUpdateIcon(update.type)}
                        </div>
                        {index < reportData.updates.length - 1 && (
                          <div className="w-px h-16 bg-border mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {update.author && (
                              <Badge variant="outline" className="text-xs">
                                {update.author}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground capitalize">
                              {update.type.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(update.timestamp)}
                          </span>
                        </div>
                        
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm">{update.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">What happens next?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your counselor will continue to work with you through this platform. 
                        Check back regularly for updates and responses.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">How to respond</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        If you need to provide additional information or have questions, 
                        you can submit a follow-up request referencing this tracking ID.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Submit Follow-up
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Can't find your tracking ID?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your tracking ID was displayed after submitting your support request. 
                  If you didn't save it, you may need to submit a new request.
                </p>
                <Link to="/report">
                  <Button variant="outline" size="sm">
                    Submit New Request
                  </Button>
                </Link>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Emergency Support</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  If you're in immediate danger or need crisis support, 
                  contact emergency services immediately.
                </p>
                <div className="space-y-1">
                  <p className="text-xs flex items-center">
                    <Phone className="w-3 h-3 mr-2" />
                    Crisis Line: 988
                  </p>
                  <p className="text-xs flex items-center">
                    <Phone className="w-3 h-3 mr-2" />
                    Campus Security: (XXX) XXX-XXXX
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
