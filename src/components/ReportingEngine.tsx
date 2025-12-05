import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Share2,
  Clock,
  CheckCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const templates = [
  {
    id: 1,
    name: "UN OCHA Monthly Report",
    description: "Standard humanitarian response reporting",
    format: "XML",
    frequency: "Monthly",
    lastGenerated: "2 days ago",
    status: "ready",
  },
  {
    id: 2,
    name: "World Bank Compliance Report",
    description: "Donor accountability and financial tracking",
    format: "CSV + PDF",
    frequency: "Quarterly",
    lastGenerated: "1 week ago",
    status: "ready",
  },
  {
    id: 3,
    name: "Multi-Country Beneficiary Summary",
    description: "Aggregated beneficiary statistics across all deployments",
    format: "Excel",
    frequency: "Weekly",
    lastGenerated: "Yesterday",
    status: "ready",
  },
  {
    id: 4,
    name: "Fraud Detection Analytics",
    description: "Security and anomaly detection insights",
    format: "PDF",
    frequency: "Bi-weekly",
    lastGenerated: "3 days ago",
    status: "ready",
  },
  {
    id: 5,
    name: "National Data Sovereignty Audit",
    description: "Country-specific compliance and data handling",
    format: "PDF + API",
    frequency: "On-demand",
    lastGenerated: "5 days ago",
    status: "generating",
  },
];

const recentReports = [
  { name: "October 2025 - UN OCHA Report", date: "Oct 9, 2025", size: "2.4 MB", downloads: 12 },
  { name: "Q3 2025 - World Bank Compliance", date: "Oct 1, 2025", size: "5.1 MB", downloads: 23 },
  { name: "Week 40 - Beneficiary Summary", date: "Oct 6, 2025", size: "890 KB", downloads: 8 },
  { name: "September - Fraud Analytics", date: "Oct 3, 2025", size: "1.7 MB", downloads: 15 },
];

export function ReportingEngine() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Unified Reporting Engine</h2>
          <p className="text-muted-foreground">
            Generate donor-compliant reports across UN, World Bank, and national standards
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filters
          </Button>
          <Button>
            <FileText className="size-4 mr-2" />
            Create Custom Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4 mt-6">
          {/* Quick Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Quick Generate</p>
                  <div className="flex gap-2">
                    <Select defaultValue="un-ocha">
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="un-ocha">UN OCHA Monthly Report</SelectItem>
                        <SelectItem value="world-bank">World Bank Compliance</SelectItem>
                        <SelectItem value="beneficiary">Beneficiary Summary</SelectItem>
                        <SelectItem value="fraud">Fraud Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Country/Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="yemen">Yemen</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>
                      <Download className="size-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <div className="grid grid-cols-1 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="size-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4>{template.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {template.description}
                          </p>
                        </div>
                        <Badge variant={template.status === "ready" ? "default" : "secondary"}>
                          {template.status === "ready" ? (
                            <>
                              <CheckCircle className="size-3 mr-1" />
                              Ready
                            </>
                          ) : (
                            <>
                              <Clock className="size-3 mr-1" />
                              Generating
                            </>
                          )}
                        </Badge>
                      </div>

                      <div className="flex gap-6 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Format: </span>
                          <span>{template.format}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency: </span>
                          <span>{template.frequency}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Generated: </span>
                          <span>{template.lastGenerated}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">
                          <Download className="size-4 mr-1" />
                          Download Latest
                        </Button>
                        <Button size="sm" variant="outline">
                          Generate Now
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="size-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="size-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Reports</CardTitle>
              <CardDescription>Download or share your recent exports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-8 text-primary" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.date} · {report.size} · {report.downloads} downloads
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="size-12 mx-auto text-muted-foreground mb-4" />
                <h3>Scheduled Reports</h3>
                <p className="text-muted-foreground mt-2">
                  Automated report generation and distribution
                </p>
                <Button className="mt-4">
                  Set Up Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
