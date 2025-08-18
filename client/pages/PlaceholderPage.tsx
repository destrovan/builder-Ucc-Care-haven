import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
  backLinkText?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backLink = "/", 
  backLinkText = "Back to Home" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm-blue/20 to-trust-teal/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
            <Construction className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            This page is currently under development. Please check back later or continue building this feature.
          </p>
          
          <Link to={backLink}>
            <Button className="w-full" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLinkText}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
