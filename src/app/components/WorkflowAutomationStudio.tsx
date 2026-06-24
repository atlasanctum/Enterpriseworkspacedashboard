import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  Play, 
  Pause, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  CheckCircle, 
  Clock,
  Zap,
  GitBranch
} from "lucide-react";

const workflows = [
  {
    id: 1,
    name: "Auto-Verify New Beneficiaries",
    description: "Automatically verify beneficiary registrations using AI fraud detection",
    status: "active",
    trigger: "New registration",
    actions: 4,
    executions: "12,847",
    successRate: "97.2%",
    timeSaved: "342 hours",
  },
  {
    id: 2,
    name: "Multi-Country Compliance Check",
    description: "Validate data against country-specific compliance frameworks",
    status: "active",
    trigger: "Daily at 2:00 AM UTC",
    actions: 6,
    executions: "1,234",
    successRate: "99.8%",
    timeSaved: "156 hours",
  },
  {
    id: 3,
    name: "Duplicate Detection Pipeline",
    description: "Cross-reference beneficiaries across all 23 countries for duplicates",
    status: "active",
    trigger: "Every 6 hours",
    actions: 8,
    executions: "4,567",
    successRate: "95.6%",
    timeSaved: "421 hours",
  },
  {
    id: 4,
    name: "Weekly Donor Report Generation",
    description: "Generate and distribute UN/World Bank standard reports",
    status: "paused",
    trigger: "Monday at 9:00 AM",
    actions: 5,
    executions: "89",
    successRate: "100%",
    timeSaved: "67 hours",
  },
];

export function WorkflowAutomationStudio() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Workflow Automation Studio</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Build and manage intelligent automations across humanitarian operations
          </p>
        </div>
        <Button size="sm" className="sm:size-default w-full sm:w-auto">
          <Plus className="size-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Active Workflows</p>
                <p className="text-xl md:text-2xl mt-1">24</p>
              </div>
              <div className="size-10 sm:size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="size-5 sm:size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Executions</p>
                <p className="text-2xl mt-1">89.2K</p>
              </div>
              <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Play className="size-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl mt-1">98.1%</p>
              </div>
              <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <CheckCircle className="size-6 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Saved</p>
                <p className="text-2xl mt-1">986h</p>
              </div>
              <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Clock className="size-6 text-purple-700 dark:text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Workflows</CardTitle>
          <CardDescription>Manage and monitor your automation pipelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow, index) => (
              <div key={workflow.id}>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-1">
                    <GitBranch className="size-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4>{workflow.name}</h4>
                          <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                            {workflow.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {workflow.description}
                        </p>
                      </div>
                      <Switch checked={workflow.status === "active"} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Trigger</p>
                        <p>{workflow.trigger}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Actions</p>
                        <p>{workflow.actions} steps</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Executions</p>
                        <p>{workflow.executions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="text-green-600">{workflow.successRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Saved</p>
                        <p>{workflow.timeSaved}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="size-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="size-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="size-4 mr-1" />
                        Test Run
                      </Button>
                      <Button size="sm" variant="outline">
                        View Logs
                      </Button>
                    </div>
                  </div>
                </div>
                
                {index < workflows.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
