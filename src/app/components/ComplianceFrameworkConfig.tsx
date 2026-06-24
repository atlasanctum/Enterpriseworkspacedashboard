import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Shield, 
  Plus,
  Edit,
  Copy,
  Trash2,
  Check,
  Globe,
  FileText,
  Lock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Separator } from "./ui/separator";

const frameworks = [
  {
    id: "gdpr",
    name: "GDPR (EU Data Protection)",
    region: "European Union",
    status: "active",
    compliance: 100,
    rules: 24,
    lastAudit: "2025-10-01",
  },
  {
    id: "un-ocha",
    name: "UN OCHA Standards",
    region: "Global",
    status: "active",
    compliance: 100,
    rules: 18,
    lastAudit: "2025-10-05",
  },
  {
    id: "world-bank",
    name: "World Bank Guidelines",
    region: "Global",
    status: "active",
    compliance: 98,
    rules: 31,
    lastAudit: "2025-10-08",
  },
  {
    id: "iso-27001",
    name: "ISO 27001 Security",
    region: "International",
    status: "active",
    compliance: 100,
    rules: 42,
    lastAudit: "2025-09-28",
  },
];

const countryRules = [
  {
    country: "Yemen",
    dataResidency: true,
    encryptionRequired: true,
    retentionPeriod: "7 years",
    biometricConsent: true,
    thirdPartySharing: false,
    customRules: 3,
  },
  {
    country: "Ethiopia",
    dataResidency: true,
    encryptionRequired: true,
    retentionPeriod: "10 years",
    biometricConsent: true,
    thirdPartySharing: true,
    customRules: 5,
  },
  {
    country: "Bangladesh",
    dataResidency: false,
    encryptionRequired: true,
    retentionPeriod: "5 years",
    biometricConsent: true,
    thirdPartySharing: true,
    customRules: 2,
  },
];

const ruleTemplates = [
  {
    id: 1,
    name: "Data Minimization",
    description: "Collect only essential beneficiary information",
    category: "Privacy",
    applicableRegions: ["Global"],
  },
  {
    id: 2,
    name: "Right to Erasure",
    description: "Allow beneficiaries to request data deletion",
    category: "Privacy Rights",
    applicableRegions: ["EU", "Global"],
  },
  {
    id: 3,
    name: "Biometric Consent",
    description: "Require explicit consent before biometric data collection",
    category: "Consent Management",
    applicableRegions: ["Global"],
  },
  {
    id: 4,
    name: "Cross-Border Transfer Controls",
    description: "Restrict data transfer across jurisdictions",
    category: "Data Sovereignty",
    applicableRegions: ["Country-specific"],
  },
];

export function ComplianceFrameworkConfig() {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);
  const [selectedCountry, setSelectedCountry] = useState(countryRules[0]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="frameworks" className="w-full">
        <TabsList>
          <TabsTrigger value="frameworks">Global Frameworks</TabsTrigger>
          <TabsTrigger value="countries">Country-Specific Rules</TabsTrigger>
          <TabsTrigger value="templates">Rule Templates</TabsTrigger>
          <TabsTrigger value="audit">Audit & Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-4 mt-6">
          {/* Active Frameworks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Compliance Frameworks</CardTitle>
                  <CardDescription>Manage global regulatory framework compliance</CardDescription>
                </div>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Add Framework
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frameworks.map((framework) => (
                  <div
                    key={framework.id}
                    className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedFramework(framework)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="size-5 text-primary" />
                          <div>
                            <h4>{framework.name}</h4>
                            <p className="text-sm text-muted-foreground">{framework.region}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Compliance</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 bg-accent rounded-full h-2 max-w-[100px]">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${framework.compliance}%` }}
                                />
                              </div>
                              <span>{framework.compliance}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Active Rules</p>
                            <p className="mt-1">{framework.rules} configured</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Audit</p>
                            <p className="mt-1">{framework.lastAudit}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <Badge variant="default" className="mt-1">
                              <CheckCircle2 className="size-3 mr-1" />
                              {framework.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="size-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Framework Details */}
          {selectedFramework && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedFramework.name} - Configuration</CardTitle>
                <CardDescription>Configure framework-specific compliance rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Framework Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Applicable Regions</Label>
                      <Input value={selectedFramework.region} readOnly />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4>Core Requirements</h4>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Data Encryption at Rest</p>
                        <p className="text-sm text-muted-foreground">AES-256 encryption for all stored data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Data Encryption in Transit</p>
                        <p className="text-sm text-muted-foreground">TLS 1.3 for all data transfers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Access Logging</p>
                        <p className="text-sm text-muted-foreground">Complete audit trail of all data access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Data Retention Limits</p>
                        <p className="text-sm text-muted-foreground">Automatic deletion after specified period</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="7" className="w-20" />
                        <span className="text-sm">years</span>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Right to Access</p>
                        <p className="text-sm text-muted-foreground">Beneficiaries can request their data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">Right to Erasure</p>
                        <p className="text-sm text-muted-foreground">Beneficiaries can request data deletion</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Check className="size-4 mr-2" />
                      Save Configuration
                    </Button>
                    <Button variant="outline">Run Compliance Check</Button>
                    <Button variant="outline">Export Framework</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="countries" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Country-Specific Compliance Rules</CardTitle>
                  <CardDescription>Configure data sovereignty and local regulations</CardDescription>
                </div>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Add Country
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {countryRules.map((country) => (
                  <div
                    key={country.country}
                    className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCountry(country)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Globe className="size-5 text-primary" />
                          <h4>{country.country}</h4>
                          <Badge variant="outline">{country.customRules} custom rules</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            {country.dataResidency ? (
                              <CheckCircle2 className="size-4 text-green-600" />
                            ) : (
                              <AlertCircle className="size-4 text-muted-foreground" />
                            )}
                            <span>Data Residency</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {country.encryptionRequired ? (
                              <CheckCircle2 className="size-4 text-green-600" />
                            ) : (
                              <AlertCircle className="size-4 text-muted-foreground" />
                            )}
                            <span>Encryption Required</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {country.biometricConsent ? (
                              <CheckCircle2 className="size-4 text-green-600" />
                            ) : (
                              <AlertCircle className="size-4 text-muted-foreground" />
                            )}
                            <span>Biometric Consent</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Retention: </span>
                            <span>{country.retentionPeriod}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Third-Party Sharing: </span>
                            <span>{country.thirdPartySharing ? "Allowed" : "Restricted"}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Rule Templates</CardTitle>
                  <CardDescription>Pre-configured rules for common compliance requirements</CardDescription>
                </div>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ruleTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="size-5 text-primary" />
                          <div>
                            <h4>{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <Badge variant="secondary">{template.category}</Badge>
                          <span className="text-muted-foreground">
                            Applicable: {template.applicableRegions.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Apply</Button>
                        <Button variant="outline" size="sm">
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Audit & Monitoring</CardTitle>
              <CardDescription>Real-time compliance monitoring and audit reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-green-900 dark:text-green-100 mb-2">Overall Compliance Status: Excellent</h4>
                      <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                        All monitored frameworks are within compliance thresholds. No critical violations detected.
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-green-700 dark:text-green-300">Frameworks Compliant</p>
                          <p className="text-green-900 dark:text-green-100">6/6 (100%)</p>
                        </div>
                        <div>
                          <p className="text-green-700 dark:text-green-300">Last Full Audit</p>
                          <p className="text-green-900 dark:text-green-100">2025-10-08</p>
                        </div>
                        <div>
                          <p className="text-green-700 dark:text-green-300">Next Scheduled</p>
                          <p className="text-green-900 dark:text-green-100">2025-11-08</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Run Full Audit Now</Button>
                  <Button variant="outline">Download Audit Report</Button>
                  <Button variant="outline">Schedule Audit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
