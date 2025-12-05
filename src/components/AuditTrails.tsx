import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Database, 
  Search, 
  Download,
  Filter,
  Shield,
  User,
  FileText,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const auditLogs = [
  {
    id: "AUD-2025-10847",
    timestamp: "2025-10-11 14:23:41",
    user: "admin@un-operations.org",
    userName: "Sarah Mitchell",
    action: "UPDATE",
    resource: "Beneficiary Record",
    resourceId: "BEN-2025-892341",
    details: "Updated verification status to 'Verified'",
    ipAddress: "192.168.1.45",
    country: "Yemen",
    severity: "low",
    status: "success"
  },
  {
    id: "AUD-2025-10846",
    timestamp: "2025-10-11 14:18:15",
    user: "auditor@worldbank.org",
    userName: "James Chen",
    action: "EXPORT",
    resource: "Compliance Report",
    resourceId: "RPT-Q3-2025",
    details: "Exported quarterly compliance report (PDF, 2.4 MB)",
    ipAddress: "203.45.67.89",
    country: "Global",
    severity: "medium",
    status: "success"
  },
  {
    id: "AUD-2025-10845",
    timestamp: "2025-10-11 13:52:03",
    user: "data-officer@ethiopia.gov",
    userName: "Abebe Worku",
    action: "DELETE",
    resource: "Duplicate Beneficiary",
    resourceId: "BEN-2025-891234",
    details: "Removed duplicate beneficiary record after fraud confirmation",
    ipAddress: "41.202.178.23",
    country: "Ethiopia",
    severity: "high",
    status: "success"
  },
  {
    id: "AUD-2025-10844",
    timestamp: "2025-10-11 13:41:27",
    user: "analyst@un-operations.org",
    userName: "Maria Rodriguez",
    action: "VIEW",
    resource: "Fraud Detection Report",
    resourceId: "FRD-2025-OCT",
    details: "Accessed sensitive fraud analytics dashboard",
    ipAddress: "192.168.1.78",
    country: "Global",
    severity: "low",
    status: "success"
  },
  {
    id: "AUD-2025-10843",
    timestamp: "2025-10-11 13:15:09",
    user: "unknown@suspicious.com",
    userName: "Unknown User",
    action: "LOGIN_FAILED",
    resource: "Authentication System",
    resourceId: "AUTH-SYS",
    details: "Failed login attempt - invalid credentials (5th attempt)",
    ipAddress: "185.220.101.45",
    country: "Unknown",
    severity: "critical",
    status: "blocked"
  },
  {
    id: "AUD-2025-10842",
    timestamp: "2025-10-11 12:58:33",
    user: "admin@un-operations.org",
    userName: "Sarah Mitchell",
    action: "CREATE",
    resource: "Workflow Automation",
    resourceId: "WF-AUTO-234",
    details: "Created new automation: 'Daily Compliance Check - Bangladesh'",
    ipAddress: "192.168.1.45",
    country: "Global",
    severity: "medium",
    status: "success"
  },
];

const actionIcons: Record<string, any> = {
  UPDATE: Edit,
  EXPORT: Download,
  DELETE: Trash2,
  VIEW: Eye,
  CREATE: FileText,
  LOGIN_FAILED: AlertTriangle,
};

export function AuditTrails() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    return matchesSearch && matchesAction && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Audit Trails & Compliance</h2>
          <p className="text-muted-foreground">
            Complete audit history and compliance tracking across all operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export Audit Log
          </Button>
          <Button>
            <Shield className="size-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events (24h)</p>
                <p className="text-2xl mt-1">24,847</p>
                <p className="text-xs text-muted-foreground mt-1">Across all systems</p>
              </div>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <p className="text-2xl mt-1">7</p>
                <p className="text-xs text-yellow-600 mt-1">Requires review</p>
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
                <p className="text-sm text-muted-foreground">Successful Actions</p>
                <p className="text-2xl mt-1">24,782</p>
                <p className="text-xs text-green-600 mt-1">99.7% success rate</p>
              </div>
              <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="size-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed/Blocked</p>
                <p className="text-2xl mt-1">65</p>
                <p className="text-xs text-muted-foreground mt-1">0.3% of total</p>
              </div>
              <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Lock className="size-6 text-red-700 dark:text-red-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4 mt-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by user, action, or resource..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="quarter">Last quarter</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="CREATE">Create</SelectItem>
                    <SelectItem value="UPDATE">Update</SelectItem>
                    <SelectItem value="DELETE">Delete</SelectItem>
                    <SelectItem value="VIEW">View</SelectItem>
                    <SelectItem value="EXPORT">Export</SelectItem>
                    <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
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

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Log Entries ({filteredLogs.length})</CardTitle>
              <CardDescription>Complete system activity history with full traceability</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => {
                    const ActionIcon = actionIcons[log.action] || FileText;
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="size-3 text-muted-foreground" />
                            {log.timestamp}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{log.userName}</p>
                            <p className="text-xs text-muted-foreground">{log.user}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            <ActionIcon className="size-3" />
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{log.resource}</p>
                            <p className="text-xs text-muted-foreground font-mono">{log.resourceId}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm truncate">{log.details}</p>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{log.country}</p>
                            <p className="text-xs text-muted-foreground font-mono">{log.ipAddress}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              log.severity === "critical" ? "destructive" :
                              log.severity === "high" ? "destructive" :
                              log.severity === "medium" ? "secondary" :
                              "outline"
                            }
                          >
                            {log.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={log.status === "success" ? "default" : "destructive"}
                          >
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>Failed login attempts, unauthorized access, and security violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="size-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4>Multiple Failed Login Attempts</h4>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        5 consecutive failed login attempts from IP 185.220.101.45 (Unknown location). 
                        Account locked automatically. Potential brute force attack.
                      </p>
                      <div className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">Time: 2025-10-11 13:15:09</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Target: unknown@suspicious.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-900">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center shrink-0">
                      <Lock className="size-5 text-yellow-700 dark:text-yellow-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4>Unusual Access Pattern Detected</h4>
                        <Badge variant="secondary">Medium</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        User accessed system from 3 different countries within 30 minutes. 
                        Possible account compromise or VPN usage.
                      </p>
                      <div className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">Time: 2025-10-11 11:42:18</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">User: analyst@un-operations.org</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <Shield className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4>Unauthorized Data Export Attempt</h4>
                        <Badge variant="outline">Low - Blocked</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        User without export permissions attempted to download beneficiary database. 
                        Request blocked by access control system.
                      </p>
                      <div className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">Time: 2025-10-11 09:23:44</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">User: temp-staff@field.org</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Regulatory compliance tracking and audit readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1">GDPR Compliance Audit - Q3 2025</h4>
                      <p className="text-sm text-muted-foreground">
                        European data protection regulation compliance verification
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Status: <Badge variant="default">Compliant</Badge></span>
                        <span className="text-muted-foreground">Generated: Oct 1, 2025</span>
                        <span className="text-muted-foreground">Score: 100%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1">UN OCHA Standards Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Humanitarian response and data handling standards
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Status: <Badge variant="default">Compliant</Badge></span>
                        <span className="text-muted-foreground">Generated: Oct 5, 2025</span>
                        <span className="text-muted-foreground">Score: 98%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1">World Bank Accountability Framework</h4>
                      <p className="text-sm text-muted-foreground">
                        Financial transparency and donor accountability
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Status: <Badge variant="default">Compliant</Badge></span>
                        <span className="text-muted-foreground">Generated: Oct 8, 2025</span>
                        <span className="text-muted-foreground">Score: 97%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention Policies</CardTitle>
              <CardDescription>Configure audit log retention and archival settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="mb-2">Current Retention Settings</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Logs Retention</p>
                      <p>90 days (hot storage)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Archive Retention</p>
                      <p>7 years (cold storage)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Security Events</p>
                      <p>10 years (permanent)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Storage Used</p>
                      <p>2.4 TB</p>
                    </div>
                  </div>
                </div>
                <Button>Configure Retention Policy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
