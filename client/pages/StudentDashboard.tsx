import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Heart, 
  TrendingUp, 
  MessageCircle, 
  BookOpen, 
  Calendar,
  Plus,
  FileText,
  Shield,
  Clock,
  Smile,
  Meh,
  Frown,
  LogOut,
  User
} from "lucide-react";

export default function StudentDashboard() {
  // Mock data - in real app this would come from API
  const recentMoods = [
    { date: "Today", mood: "good", icon: Smile, color: "text-green-500" },
    { date: "Yesterday", mood: "neutral", icon: Meh, color: "text-yellow-500" },
    { date: "2 days ago", mood: "low", icon: Frown, color: "text-red-500" },
  ];

  const weeklyProgress = 75; // Percentage of days logged this week

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
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Student</h2>
          <p className="text-muted-foreground">Here's how you're doing with your wellness journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Take care of your mental health today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col space-y-2 bg-primary hover:bg-primary/90">
                    <TrendingUp className="w-6 h-6" />
                    <span>Log Mood</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <FileText className="w-6 h-6" />
                    <span>Write Journal</span>
                  </Button>
                  <Link to="/report">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 w-full">
                      <MessageCircle className="w-6 h-6" />
                      <span>Get Support</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Mood Tracking Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-hope-green" />
                  <span>Mood Tracking</span>
                </CardTitle>
                <CardDescription>Your emotional wellness overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">This week's progress</span>
                    <Badge variant="secondary">{weeklyProgress}% complete</Badge>
                  </div>
                  <Progress value={weeklyProgress} className="h-2" />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Mood Entries</h4>
                    {recentMoods.map((entry, index) => {
                      const IconComponent = entry.icon;
                      return (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 ${entry.color}`} />
                            <span className="text-sm">{entry.date}</span>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {entry.mood}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Full History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Journal Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-trust-teal" />
                  <span>Journal Entries</span>
                </CardTitle>
                <CardDescription>Your private thoughts and reflections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Today's Entry</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Feeling better today after the counseling session. The breathing exercises really helped...
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Yesterday</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Had a difficult day with exams approaching. Anxiety levels were high but managed to...
                    </p>
                  </div>
                  
                  <Button variant="ghost" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Entries
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Support Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Counselor Available</span>
                  </div>
                  
                  <div className="border rounded-lg p-3 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Active Report</span>
                      <Badge variant="outline" className="text-xs">In Progress</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Your counselor has responded to your report
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Clock className="w-3 h-3 mr-2" />
                      View Update
                    </Button>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-trust-teal" />
                  <span>Quick Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <div className="font-medium text-sm">Breathing Exercises</div>
                      <div className="text-xs text-muted-foreground">5-minute guided session</div>
                    </div>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <div className="font-medium text-sm">Study Stress Tips</div>
                      <div className="text-xs text-muted-foreground">Managing exam anxiety</div>
                    </div>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <div className="font-medium text-sm">Sleep Hygiene</div>
                      <div className="text-xs text-muted-foreground">Better rest for better health</div>
                    </div>
                  </Button>
                  
                  <Link to="/resources">
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse All Resources
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Reminder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-accent-foreground" />
                  <span>Privacy Protected</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Your data is encrypted and confidential. Only you and your assigned counselors can access your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
