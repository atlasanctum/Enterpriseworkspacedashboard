import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Shield, CheckCircle, FileCheck, Lock, Globe } from "lucide-react";

const complianceFrameworks = [
  { name: "UN OCHA Standards", status: "compliant", score: 100, icon: Globe },
  { name: "GDPR (EU)", status: "compliant", score: 100, icon: Shield },
  { name: "World Bank Guidelines", status: "compliant", score: 98, icon: FileCheck },
  { name: "ISO 27001 Security", status: "compliant", score: 100, icon: Lock },
  { name: "OECD Data Protection", status: "compliant", score: 97, icon: CheckCircle },
  { name: "National Data Sovereignty", status: "compliant", score: 100, icon: Shield },
];

export function ComplianceStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance & Governance</CardTitle>
        <CardDescription>Global regulatory framework adherence</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceFrameworks.map((framework) => {
            const Icon = framework.icon;
            return (
              <div key={framework.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-sm">{framework.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{framework.score}%</span>
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="size-3 mr-1" />
                      {framework.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={framework.score} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
