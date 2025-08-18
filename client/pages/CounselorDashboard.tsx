import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Clock, 
  AlertTriangle,
  MessageCircle,
  FileText,
  Send,
  Eye,
  LogOut,
  User,
  TrendingUp,
  CalendarDays,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Circle,
  AlertCircle
} from "lucide-react";

export default function CounselorDashboard() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [newUpdate, setNewUpdate] = useState("");
  const [updateType, setUpdateType] = useState("public");

  // Mock data - in real app this would come from API
  const cases = [
    {
      id: "UCC-CARE-A8K9J2",
      student: "Anonymous Student",
      priority: "high",
      status: "new",
      submittedAt: "2024-01-15T14:30:00Z",
      lastUpdate: "2024-01-15T14:30:00Z",
      description: "Experiencing severe anxiety about upcoming exams and having panic attacks...",
      counselor: "Dr. Sarah Chen",
      isAnonymous: true
    },
    {
      id: "UCC-CARE-B7H6G5",
      student: "Student #12847",
      priority: "medium",
      status: "in_progress",
      submittedAt: "2024-01-14T09:15:00Z",
      lastUpdate: "2024-01-15T11:20:00Z",
      description: "Struggling with depression and social isolation since starting college...",
      counselor: "Dr. Sarah Chen",
      isAnonymous: false
    },
    {
      id: "UCC-CARE-C6F5D4",
      student: "Student #15923",
      priority: "low",
      status: "resolved",
      submittedAt: "2024-01-12T16:45:00Z",
      lastUpdate: "2024-01-14T13:30:00Z",
      description: "Needed support with stress management techniques for academic workload...",
      counselor: "Dr. Sarah Chen",
      isAnonymous: false
    }
  ];

  const updates = [
    {
      id: "1",
      caseId: "UCC-CARE-B7H6G5",
      author: "Dr. Sarah Chen",
      content: "Discussed coping strategies and provided resources for managing social anxiety. Student responded well to cognitive behavioral techniques.",
      timestamp: "2024-01-15T11:20:00Z",
      isPrivate: false
    },
    {
      id: "2",
      caseId: "UCC-CARE-B7H6G5",
      author: "Dr. Sarah Chen",
      content: "Private note: Student shows signs of improvement but may need longer-term support. Consider referring to group therapy sessions.",
      timestamp: "2024-01-15T11:25:00Z",
      isPrivate: true
    }
  ];

  const stats = {
    totalCases: 24,
    newCases: 3,
    inProgress: 8,
    resolved: 13,
    highPriority: 2
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'resolved': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const handleSendUpdate = () => {
    if (!newUpdate.trim()) return;
    
    // In real app, this would submit to API
    console.log('Sending update:', {
      caseId: selectedCase,
      content: newUpdate,
      isPrivate: updateType === 'private'
    });
    
    setNewUpdate("");
    setUpdateType("public");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">Counselor Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Dr. Sarah Chen
              </Button>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cases</p>
                  <p className="text-2xl font-bold">{stats.totalCases}</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Cases</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.newCases}</p>
                </div>
                <Circle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Cases</span>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage student support requests and cases
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {cases.map((case_) => (
                    <div
                      key={case_.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedCase === case_.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedCase(case_.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {case_.isAnonymous ? '?' : case_.student.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{case_.student}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {case_.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          <Badge className={`text-xs ${getPriorityColor(case_.priority)}`}>
                            {case_.priority}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(case_.status)}`}>
                            {case_.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(case_.lastUpdate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-2">
            {selectedCase ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Case Details</CardTitle>
                      <CardDescription>ID: {selectedCase}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View History
                      </Button>
                      <Select defaultValue="in_progress">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Case Details</TabsTrigger>
                      <TabsTrigger value="communication">Communication</TabsTrigger>
                      <TabsTrigger value="notes">Private Notes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Student Information</Label>
                          <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm">{cases.find(c => c.id === selectedCase)?.student}</p>
                            <p className="text-xs text-muted-foreground">
                              {cases.find(c => c.id === selectedCase)?.isAnonymous ? 'Anonymous submission' : 'Authenticated student'}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Initial Description</Label>
                          <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm">{cases.find(c => c.id === selectedCase)?.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Priority Level</Label>
                            <div className="mt-2">
                              <Badge className={getPriorityColor(cases.find(c => c.id === selectedCase)?.priority || '')}>
                                {cases.find(c => c.id === selectedCase)?.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Submitted</Label>
                            <p className="text-sm mt-2">
                              {formatDate(cases.find(c => c.id === selectedCase)?.submittedAt || '')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="communication" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {updates
                            .filter(update => update.caseId === selectedCase && !update.isPrivate)
                            .map(update => (
                              <div key={update.id} className="p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">{update.author}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(update.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm">{update.content}</p>
                              </div>
                            ))}
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Send Update to Student</Label>
                          <Textarea
                            placeholder="Type your response to the student..."
                            value={newUpdate}
                            onChange={(e) => setNewUpdate(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex items-center justify-between">
                            <Select value={updateType} onValueChange={setUpdateType}>
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public Response</SelectItem>
                                <SelectItem value="private">Private Note</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button onClick={handleSendUpdate} disabled={!newUpdate.trim()}>
                              <Send className="w-4 h-4 mr-2" />
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notes" className="space-y-4">
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {updates
                          .filter(update => update.caseId === selectedCase && update.isPrivate)
                          .map(update => (
                            <div key={update.id} className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">{update.author}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(update.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm">{update.content}</p>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center space-y-3">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Select a case to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
