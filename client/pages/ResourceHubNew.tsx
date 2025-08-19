import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { 
  Heart, 
  ArrowLeft, 
  Search,
  BookOpen,
  Play,
  ExternalLink,
  Clock,
  Star,
  Filter,
  Eye,
  Download,
  Users,
  Headphones,
  FileText,
  Video,
  Globe,
  TrendingUp,
  Zap,
  Moon,
  Coffee,
  Brain
} from "lucide-react";

export default function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [resources, setResources] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch resources from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await fetch('/api/resources/categories');
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.success) {
          setCategories(categoriesData.categories);
        }

        // Fetch resources
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (selectedType !== 'all') params.append('type', selectedType);
        if (searchQuery) params.append('search', searchQuery);

        const resourcesResponse = await fetch(`/api/resources?${params}`);
        const resourcesData = await resourcesResponse.json();
        if (resourcesData.success) {
          setResources(resourcesData.resources);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selectedType, searchQuery]);

  const featuredResources = resources.filter((resource) => resource.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'resource': return <Globe className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'anxiety': return <Zap className="w-4 h-4" />;
      case 'depression': return <Brain className="w-4 h-4" />;
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'wellness': return <Coffee className="w-4 h-4" />;
      case 'crisis': return <Heart className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleResourceView = async (resourceId: string) => {
    try {
      await fetch(`/api/resources/${resourceId}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">UCC Care</h1>
                <p className="text-sm text-muted-foreground">Mental Health Resource Hub</p>
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

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Mental Health Resource Hub</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover evidence-based resources, tools, and guides to support your mental health and wellness journey
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, topics, or techniques..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="resource">Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading resources...</p>
          </div>
        ) : (
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="featured">Featured Resources</TabsTrigger>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="categories">Browse by Category</TabsTrigger>
            </TabsList>
            
            {/* Featured Resources */}
            <TabsContent value="featured" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Featured
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(resource.type)}
                          <span className="text-xs text-muted-foreground capitalize">{resource.type}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {resource.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{resource.views}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleResourceView(resource.id)}
                      >
                        {resource.type === 'video' && <Play className="w-4 h-4 mr-2" />}
                        {resource.type === 'audio' && <Headphones className="w-4 h-4 mr-2" />}
                        {resource.type === 'article' && <BookOpen className="w-4 h-4 mr-2" />}
                        {resource.type === 'resource' && <ExternalLink className="w-4 h-4 mr-2" />}
                        Access Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* All Resources */}
            <TabsContent value="all" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {resources.length} resources
                </p>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-4">
                {resources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getTypeIcon(resource.type)}
                            <h3 className="font-semibold text-lg">{resource.title}</h3>
                            {resource.featured && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{resource.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{resource.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{resource.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{resource.views} views</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="ml-6">
                          <Button onClick={() => handleResourceView(resource.id)}>
                            {resource.type === 'video' && <Play className="w-4 h-4 mr-2" />}
                            {resource.type === 'audio' && <Headphones className="w-4 h-4 mr-2" />}
                            {resource.type === 'article' && <BookOpen className="w-4 h-4 mr-2" />}
                            {resource.type === 'resource' && <ExternalLink className="w-4 h-4 mr-2" />}
                            Access
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Categories */}
            <TabsContent value="categories" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.filter(cat => cat.id !== 'all').map((category) => (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getCategoryIcon(category.id)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.count} resources</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        Browse {category.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Quick Access Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Immediate support and emergency resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
                <Heart className="w-6 h-6 text-red-500" />
                <span className="font-medium">Crisis Support</span>
                <span className="text-xs text-muted-foreground">Immediate help resources</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="font-medium">Quick Relief</span>
                <span className="text-xs text-muted-foreground">5-minute techniques</span>
              </Button>
              
              <Link to="/report">
                <Button className="h-auto flex-col space-y-2 p-4 w-full">
                  <Users className="w-6 h-6" />
                  <span className="font-medium">Talk to Counselor</span>
                  <span className="text-xs">Get professional support</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
