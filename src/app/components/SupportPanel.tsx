import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Headphones, MessageSquare, FileText, ExternalLink, Clock, Users } from "lucide-react";

export function SupportPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>24/7 Priority Support</CardTitle>
          <CardDescription>Dedicated enterprise assistance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Headphones className="size-5 text-green-700 dark:text-green-300" />
              </div>
              <div>
                <p className="font-medium">Support Available</p>
                <p className="text-sm text-muted-foreground">Average response: 8 minutes</p>
              </div>
            </div>
            <Badge variant="default" className="bg-green-600">Online</Badge>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="size-4 mr-2" />
              Live Chat with Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="size-4 mr-2" />
              Contact Customer Success Manager
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="size-4 mr-2" />
              View Documentation
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current SLA</span>
              <span className="font-medium">99.95% Uptime Guarantee</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">This month</span>
              <span className="font-medium text-green-600">99.97% ✓</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Deployment and configuration details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Deployment Type</p>
                <p className="font-medium">Hybrid (Cloud + On-Premise)</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Data Sovereignty</p>
                <p className="font-medium">Enabled - 23 Countries</p>
              </div>
              <Badge variant="secondary">Compliant</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">White-Label Branding</p>
                <p className="font-medium">UN Global Operations</p>
              </div>
              <Badge variant="secondary">Custom</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Contract Period</p>
                <p className="font-medium">Multi-Year (2024-2027)</p>
              </div>
              <Badge variant="secondary">Enterprise</Badge>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <ExternalLink className="size-4 mr-2" />
            View Full System Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
