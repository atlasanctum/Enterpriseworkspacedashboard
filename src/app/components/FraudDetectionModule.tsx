import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const fraudCases = [
  {
    id: "FD-2025-1847",
    type: "Duplicate Registration",
    severity: "high",
    country: "Yemen",
    beneficiary: "Ahmed M. Hassan",
    detectedAt: "2025-10-11 08:23",
    confidence: 94,
    status: "under-review",
    details: "Potential duplicate registration with biometric match (fingerprint 89% similarity)"
  },
  {
    id: "FD-2025-1846",
    type: "Ghost Beneficiary",
    severity: "critical",
    country: "South Sudan",
    beneficiary: "Mary K. Johnson",
    detectedAt: "2025-10-11 06:15",
    confidence: 97,
    status: "confirmed",
    details: "Distribution claimed but no biometric verification on-site"
  },
  {
    id: "FD-2025-1845",
    type: "Age Manipulation",
    severity: "medium",
    country: "Bangladesh",
    beneficiary: "Rashid Khan",
    detectedAt: "2025-10-10 22:41",
    confidence: 82,
    status: "under-review",
    details: "Age data inconsistent across multiple registration points"
  },
  {
    id: "FD-2025-1844",
    type: "Location Anomaly",
    severity: "low",
    country: "Ethiopia",
    beneficiary: "Abebe Desta",
    detectedAt: "2025-10-10 19:30",
    confidence: 76,
    status: "resolved",
    details: "Registration location 300km from claimed residence - Resolved: Temporary displacement"
  },
  {
    id: "FD-2025-1843",
    type: "Duplicate Registration",
    severity: "high",
    country: "Syria",
    beneficiary: "Fatima Al-Rashid",
    detectedAt: "2025-10-10 14:22",
    confidence: 91,
    status: "confirmed",
    details: "Multiple registrations across Damascus and Aleppo facilities"
  },
];

const trendData = [
  { month: "Apr", total: 127, confirmed: 89, resolved: 96 },
  { month: "May", total: 142, confirmed: 103, resolved: 115 },
  { month: "Jun", total: 156, confirmed: 112, resolved: 128 },
  { month: "Jul", total: 134, confirmed: 95, resolved: 108 },
  { month: "Aug", total: 168, confirmed: 124, resolved: 141 },
  { month: "Sep", total: 145, confirmed: 107, resolved: 122 },
  { month: "Oct", total: 189, confirmed: 141, resolved: 98 },
];

const fraudTypeDistribution = [
  { name: "Duplicate Registration", value: 342, color: "hsl(var(--chart-1))" },
  { name: "Ghost Beneficiary", value: 187, color: "hsl(var(--chart-2))" },
  { name: "Age Manipulation", value: 124, color: "hsl(var(--chart-3))" },
  { name: "Location Anomaly", value: 98, color: "hsl(var(--chart-4))" },
  { name: "Document Fraud", value: 73, color: "hsl(var(--chart-5))" },
];

export function FraudDetectionModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredCases = fraudCases.filter(fraudCase => {
    const matchesSearch = fraudCase.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fraudCase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fraudCase.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || fraudCase.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || fraudCase.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Advanced Fraud Detection</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            AI-powered anomaly detection and verification across all deployments
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="sm:size-default">
            <Download className="size-4 sm:mr-2" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
          <Button size="sm" className="sm:size-default">
            <Shield className="size-4 sm:mr-2" />
            <span className="hidden sm:inline">Configure Rules</span>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Active Cases</p>
                <p className="text-xl md:text-2xl mt-1">47</p>
                <p className="text-xs text-muted-foreground mt-1">Under review</p>
              </div>
              <div className="size-10 sm:size-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center shrink-0">
                <Clock className="size-5 sm:size-6 text-yellow-700 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Detection Rate</p>
                <p className="text-2xl mt-1">96.8%</p>
                <p className="text-xs text-green-600 mt-1">+2.1% this month</p>
              </div>
              <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <TrendingUp className="size-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed Fraud</p>
                <p className="text-2xl mt-1">824</p>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </div>
              <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertTriangle className="size-6 text-red-700 dark:text-red-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">False Positives</p>
                <p className="text-2xl mt-1">3.2%</p>
                <p className="text-xs text-muted-foreground mt-1">98 cases resolved</p>
              </div>
              <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <CheckCircle className="size-6 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Active Cases</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4 mt-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, beneficiary, or country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cases Table */}
          <Card>
            <CardHeader>
              <CardTitle>Fraud Cases ({filteredCases.length})</CardTitle>
              <CardDescription>Review and manage detected anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Beneficiary</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((fraudCase) => (
                    <TableRow key={fraudCase.id}>
                      <TableCell className="font-mono text-sm">{fraudCase.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            fraudCase.severity === "critical" ? "destructive" :
                            fraudCase.severity === "high" ? "destructive" :
                            fraudCase.severity === "medium" ? "secondary" :
                            "outline"
                          }
                        >
                          {fraudCase.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{fraudCase.beneficiary}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {fraudCase.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-accent rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${fraudCase.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm">{fraudCase.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{fraudCase.detectedAt}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            fraudCase.status === "confirmed" ? "destructive" :
                            fraudCase.status === "under-review" ? "secondary" :
                            "outline"
                          }
                        >
                          {fraudCase.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="size-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="size-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="size-4" />
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

        <TabsContent value="analytics" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Trends</CardTitle>
                <CardDescription>Monthly detection and resolution rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
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
                    <Area type="monotone" dataKey="total" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} name="Total Detections" />
                    <Area type="monotone" dataKey="confirmed" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} name="Confirmed" />
                    <Area type="monotone" dataKey="resolved" stackId="3" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.6} name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Type Distribution</CardTitle>
                <CardDescription>Cases by fraud category (last 6 months)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fraudTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fraudTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Pattern Detection</CardTitle>
              <CardDescription>Machine learning insights and anomaly patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-5 text-yellow-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="mb-2">Emerging Pattern: Cross-Border Duplicates</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI detected a 34% increase in potential duplicate registrations between Yemen and Syria deployments. 
                        Recommend enhanced biometric verification at border crossing points.
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">High Confidence: 91%</Badge>
                        <Badge variant="outline">23 cases identified</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-start gap-3">
                    <Users className="size-5 text-blue-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="mb-2">Behavioral Anomaly: Unusual Registration Times</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pattern detected: 47 registrations in South Sudan occurring between 2-4 AM, outside normal operating hours. 
                        Possible data entry manipulation.
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Medium Confidence: 78%</Badge>
                        <Badge variant="outline">Requires investigation</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-start gap-3">
                    <Shield className="size-5 text-green-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="mb-2">Success Pattern: Improved Verification in Ethiopia</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Positive trend: Ethiopia deployment showing 43% reduction in fraud cases after implementing 
                        enhanced biometric scanning protocols.
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="default">Best Practice Identified</Badge>
                        <Badge variant="outline">Recommend rollout</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
