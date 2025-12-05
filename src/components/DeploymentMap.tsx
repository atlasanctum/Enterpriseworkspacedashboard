import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const deployments = [
  { country: "Ethiopia", region: "East Africa", beneficiaries: "2.1M", status: "active", uptime: "99.98%" },
  { country: "Bangladesh", region: "South Asia", beneficiaries: "1.8M", status: "active", uptime: "99.96%" },
  { country: "Yemen", region: "Middle East", beneficiaries: "1.5M", status: "active", uptime: "99.95%" },
  { country: "South Sudan", region: "East Africa", beneficiaries: "980K", status: "active", uptime: "99.93%" },
  { country: "Syria", region: "Middle East", beneficiaries: "1.2M", status: "active", uptime: "99.97%" },
  { country: "Venezuela", region: "Latin America", beneficiaries: "850K", status: "active", uptime: "99.99%" },
  { country: "Afghanistan", region: "Central Asia", beneficiaries: "1.1M", status: "maintenance", uptime: "99.91%" },
  { country: "Myanmar", region: "Southeast Asia", beneficiaries: "720K", status: "active", uptime: "99.94%" },
  { country: "Nigeria", region: "West Africa", beneficiaries: "640K", status: "active", uptime: "99.96%" },
  { country: "Haiti", region: "Caribbean", beneficiaries: "410K", status: "deploying", uptime: "N/A" },
];

export function DeploymentMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-Country Deployments</CardTitle>
        <CardDescription>Real-time status across all active regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deployments.map((deployment) => (
            <div
              key={deployment.country}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  {deployment.status === "active" && (
                    <CheckCircle className="size-5 text-green-600" />
                  )}
                  {deployment.status === "maintenance" && (
                    <AlertCircle className="size-5 text-yellow-600" />
                  )}
                  {deployment.status === "deploying" && (
                    <Clock className="size-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{deployment.country}</p>
                  <p className="text-sm text-muted-foreground">{deployment.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{deployment.beneficiaries}</p>
                  <p className="text-xs text-muted-foreground">beneficiaries</p>
                </div>
                <div className="text-right min-w-[60px]">
                  <p className="text-sm font-medium">{deployment.uptime}</p>
                  <p className="text-xs text-muted-foreground">uptime</p>
                </div>
                <Badge 
                  variant={
                    deployment.status === "active" ? "default" : 
                    deployment.status === "maintenance" ? "secondary" : 
                    "outline"
                  }
                  className="min-w-[90px] justify-center"
                >
                  {deployment.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
