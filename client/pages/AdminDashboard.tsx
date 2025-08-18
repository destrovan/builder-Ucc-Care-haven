import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  TrendingUp,
  AlertTriangle,
  Settings,
  Database,
  LogOut,
  User,
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  Activity,
  FileText,
  Calendar,
  Download,
  Eye,
  UserCheck,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data - in real app this would come from API
  const systemStats = {
    totalUsers: 1247,
    activeStudents: 1089,
    activeCounselors: 12,
    totalReports: 156,
    resolvedReports: 134,
    pendingReports: 22,
    avgResponseTime: "4.2 hours",
    systemUptime: "99.8%",
  };

  const recentUsers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "s.johnson@student.ucc.edu",
      role: "student",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      email: "m.chen@ucc.edu",
      role: "counselor",
      status: "active",
      joinDate: "2024-01-10",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "e.wilson@student.ucc.edu",
      role: "student",
      status: "pending",
      joinDate: "2024-01-14",
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "a.thompson@student.ucc.edu",
      role: "student",
      status: "active",
      joinDate: "2024-01-12",
    },
  ];

  const systemLogs = [
    {
      id: "1",
      timestamp: "2024-01-15T14:30:00Z",
      level: "info",
      action: "User Login",
      details: "Student login successful",
      user: "s.johnson@student.ucc.edu",
    },
    {
      id: "2",
      timestamp: "2024-01-15T14:25:00Z",
      level: "warning",
      action: "Failed Login",
      details: "Multiple failed login attempts",
      user: "unknown@domain.com",
    },
    {
      id: "3",
      timestamp: "2024-01-15T14:20:00Z",
      level: "info",
      action: "Report Submitted",
      details: "New support request created",
      user: "anonymous",
    },
    {
      id: "4",
      timestamp: "2024-01-15T14:15:00Z",
      level: "info",
      action: "Case Updated",
      details: "Counselor response added",
      user: "m.chen@ucc.edu",
    },
  ];

  const resources = [
    {
      id: "1",
      title: "Managing Exam Stress",
      category: "Academic",
      views: 89,
      status: "published",
      lastUpdated: "2024-01-10",
    },
    {
      id: "2",
      title: "Breathing Exercises for Anxiety",
      category: "Wellness",
      views: 156,
      status: "published",
      lastUpdated: "2024-01-08",
    },
    {
      id: "3",
      title: "Building Social Connections",
      category: "Social",
      views: 67,
      status: "draft",
      lastUpdated: "2024-01-12",
    },
    {
      id: "4",
      title: "Sleep Hygiene Guide",
      category: "Health",
      views: 134,
      status: "published",
      lastUpdated: "2024-01-05",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "suspended":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "published":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "draft":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "error":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
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
                <p className="text-sm text-muted-foreground">
                  System Administration
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Admin User
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
        {/* System Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{systemStats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Students
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {systemStats.activeStudents}
                  </p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-primary">
                    {systemStats.totalReports}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold text-green-600">
                    {systemStats.systemUptime}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Panel Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Platform Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <Badge className="bg-green-500/10 text-green-700">
                        {systemStats.avgResponseTime}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resolved Reports</span>
                      <Badge className="bg-blue-500/10 text-blue-700">
                        {systemStats.resolvedReports}/{systemStats.totalReports}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Counselors</span>
                      <Badge className="bg-primary/10 text-primary">
                        {systemStats.activeCounselors}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>System Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">
                          High Priority Reports
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 reports require immediate attention
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">System Health</p>
                        <p className="text-xs text-muted-foreground">
                          All services operational
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.joinDate)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Resource Hub Management</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">
                          {resource.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{resource.category}</Badge>
                        </TableCell>
                        <TableCell>{resource.views}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(resource.status)}>
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDate(resource.lastUpdated)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>
                    Platform usage statistics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-semibold">423</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Reports This Month</span>
                      <span className="font-semibold">67</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resource Views</span>
                      <span className="font-semibold">1,245</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                  <CardDescription>
                    Download system reports and analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      User Activity Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Mental Health Metrics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      System Performance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Activity Logs</CardTitle>
                  <div className="flex space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                        <TableCell>
                          <Badge className={getLogLevelColor(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {log.action}
                        </TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.user}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
