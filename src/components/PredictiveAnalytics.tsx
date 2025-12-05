import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUp, 
  Brain, 
  AlertTriangle,
  Download,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Target
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";

const beneficiaryForecast = [
  { month: "Oct", actual: 12427, predicted: 12450, confidence: [12300, 12600] },
  { month: "Nov", actual: null, predicted: 13200, confidence: [12950, 13450] },
  { month: "Dec", actual: null, predicted: 13850, confidence: [13550, 14150] },
  { month: "Jan", actual: null, predicted: 14500, confidence: [14150, 14850] },
  { month: "Feb", actual: null, predicted: 15100, confidence: [14700, 15500] },
  { month: "Mar", actual: null, predicted: 15650, confidence: [15200, 16100] },
];

const resourceDemand = [
  { region: "East Africa", current: 340, predicted: 425, gap: 85, priority: "high" },
  { region: "Middle East", current: 280, predicted: 310, gap: 30, priority: "medium" },
  { region: "South Asia", current: 195, predicted: 245, gap: 50, priority: "high" },
  { region: "West Africa", current: 120, predicted: 135, gap: 15, priority: "low" },
  { region: "Latin America", current: 85, predicted: 95, gap: 10, priority: "low" },
];

const crisisForecasts = [
  {
    location: "Horn of Africa",
    type: "Drought",
    probability: 87,
    severity: "high",
    timeframe: "Next 45 days",
    estimatedImpact: "2.1M people",
    confidence: 91,
  },
  {
    location: "Central Sahel",
    type: "Food Insecurity",
    probability: 76,
    severity: "medium",
    timeframe: "Next 60 days",
    estimatedImpact: "850K people",
    confidence: 83,
  },
  {
    location: "Southeast Asia",
    type: "Flooding",
    probability: 68,
    severity: "medium",
    timeframe: "Next 30 days",
    estimatedImpact: "1.4M people",
    confidence: 79,
  },
];

const impactSimulation = [
  { scenario: "Baseline", beneficiaries: 12400, cost: 186, efficiency: 100 },
  { scenario: "+10% Scale", beneficiaries: 13640, cost: 198, efficiency: 106 },
  { scenario: "+25% Scale", beneficiaries: 15500, cost: 217, efficiency: 109 },
  { scenario: "Optimized", beneficiaries: 14200, cost: 189, efficiency: 115 },
];

export function PredictiveAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Predictive Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            AI-powered forecasting for resource allocation and crisis anticipation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export Forecasts
          </Button>
          <Button>
            <Brain className="size-4 mr-2" />
            Model Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                <p className="text-2xl mt-1">94.2%</p>
                <p className="text-xs text-green-600 mt-1">+1.8% improvement</p>
              </div>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl mt-1">12</p>
                <p className="text-xs text-muted-foreground mt-1">Running predictions</p>
              </div>
              <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Brain className="size-6 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crisis Alerts</p>
                <p className="text-2xl mt-1">3</p>
                <p className="text-xs text-yellow-600 mt-1">High probability events</p>
              </div>
              <div className="size-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <AlertTriangle className="size-6 text-yellow-700 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predictions Made</p>
                <p className="text-2xl mt-1">48.2K</p>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </div>
              <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <TrendingUp className="size-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="beneficiary" className="w-full">
        <TabsList>
          <TabsTrigger value="beneficiary">Beneficiary Forecasts</TabsTrigger>
          <TabsTrigger value="resources">Resource Demand</TabsTrigger>
          <TabsTrigger value="crisis">Crisis Prediction</TabsTrigger>
          <TabsTrigger value="impact">Impact Simulation</TabsTrigger>
        </TabsList>

        <TabsContent value="beneficiary" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Beneficiary Growth Forecast</CardTitle>
              <CardDescription>6-month predictive model with confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={beneficiaryForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius-md)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                    name="Actual"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.3}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 rounded-lg bg-accent">
                <h4 className="mb-3 flex items-center gap-2">
                  <Brain className="size-4" />
                  AI Insights
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    • Projected 25.9% growth in beneficiary registrations over the next 6 months
                  </p>
                  <p className="text-muted-foreground">
                    • Highest growth expected in East Africa (+34%) and South Asia (+28%)
                  </p>
                  <p className="text-muted-foreground">
                    • Model confidence: 91% based on historical patterns and regional indicators
                  </p>
                  <p className="text-muted-foreground">
                    • Recommendation: Scale infrastructure capacity by 30% before December 2025
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Demand Forecast</CardTitle>
              <CardDescription>Predicted resource requirements by region (thousands of units)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={resourceDemand}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius-md)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="hsl(var(--chart-3))" name="Current" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="predicted" fill="hsl(var(--chart-1))" name="Predicted" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gap" fill="hsl(var(--chart-2))" name="Gap" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3">
                {resourceDemand.map((region) => (
                  <div key={region.region} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-muted-foreground" />
                        <div>
                          <p>{region.region}</p>
                          <p className="text-sm text-muted-foreground">
                            Gap: {region.gap}K units needed
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          region.priority === "high" ? "destructive" :
                          region.priority === "medium" ? "secondary" :
                          "outline"
                        }
                      >
                        {region.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crisis" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Crisis Forecasting</CardTitle>
              <CardDescription>AI-powered early warning system for humanitarian emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crisisForecasts.map((crisis, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-accent/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="size-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="mb-1">{crisis.type} - {crisis.location}</h4>
                            <p className="text-sm text-muted-foreground">
                              Estimated Impact: {crisis.estimatedImpact}
                            </p>
                          </div>
                          <Badge
                            variant={crisis.severity === "high" ? "destructive" : "secondary"}
                          >
                            {crisis.severity} severity
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Probability</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 bg-accent rounded-full h-2">
                                <div
                                  className="bg-destructive h-2 rounded-full"
                                  style={{ width: `${crisis.probability}%` }}
                                />
                              </div>
                              <span className="text-sm">{crisis.probability}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Model Confidence</p>
                            <p className="mt-1">{crisis.confidence}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Timeframe</p>
                            <p className="mt-1">{crisis.timeframe}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm">View Detailed Forecast</Button>
                          <Button size="sm" variant="outline">Activate Response Plan</Button>
                          <Button size="sm" variant="outline">Alert Stakeholders</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Brain className="size-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-2">Predictive Model Performance</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        The crisis forecasting model has achieved 89% accuracy in predicting humanitarian 
                        emergencies 30-60 days in advance, enabling proactive resource positioning and 
                        intervention planning.
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Correct Predictions</p>
                          <p>127/143 (89%)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">False Positives</p>
                          <p>9 (6.3%)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Missed Events</p>
                          <p>7 (4.9%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact Simulation</CardTitle>
              <CardDescription>Model different scenarios and their humanitarian outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactSimulation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="scenario" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius-md)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="beneficiaries" fill="hsl(var(--chart-1))" name="Beneficiaries (thousands)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" fill="hsl(var(--chart-2))" name="Cost ($ millions)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="efficiency" fill="hsl(var(--chart-3))" name="Efficiency Index" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3">
                <div className="p-4 rounded-lg bg-accent">
                  <h4 className="mb-3">Scenario Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-primary">Optimized Scenario:</span> Achieves 15% higher efficiency 
                      through strategic resource allocation and workflow automation
                    </p>
                    <p>
                      <span className="text-primary">+25% Scale:</span> Demonstrates economies of scale with 
                      only 16% cost increase for 25% more beneficiaries
                    </p>
                    <p>
                      <span className="text-primary">Recommendation:</span> Implement optimized scenario to 
                      serve 14.2M beneficiaries with minimal cost increase
                    </p>
                  </div>
                </div>

                <Button className="w-full">
                  <Download className="size-4 mr-2" />
                  Generate Detailed Impact Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
