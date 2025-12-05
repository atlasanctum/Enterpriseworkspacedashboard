import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUp, Users, Globe, Shield, TrendingUp, Activity, Database, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

const metrics = [
  {
    title: "Active Beneficiaries",
    value: "12.4M",
    change: "+18.2%",
    trend: "up",
    icon: Users,
    subtitle: "Across 23 countries",
  },
  {
    title: "System Uptime",
    value: "99.97%",
    change: "SLA: 99.95%",
    trend: "up",
    icon: Activity,
    subtitle: "Last 30 days",
  },
  {
    title: "Fraud Detection Rate",
    value: "96.8%",
    change: "+2.1%",
    trend: "up",
    icon: Shield,
    subtitle: "Verification accuracy",
  },
  {
    title: "Countries Deployed",
    value: "23",
    change: "+3 this quarter",
    trend: "up",
    icon: Globe,
    subtitle: "Multi-region coverage",
  },
  {
    title: "Daily Transactions",
    value: "1.8M",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    subtitle: "Processing capacity",
  },
  {
    title: "Data Processing",
    value: "2.1M/day",
    change: "Peak: 3.2M",
    trend: "up",
    icon: Database,
    subtitle: "Beneficiary records",
  },
  {
    title: "Avg Response Time",
    value: "127ms",
    change: "-23ms",
    trend: "up",
    icon: Clock,
    subtitle: "API latency",
  },
  {
    title: "Intervention Efficiency",
    value: "+64%",
    change: "vs baseline",
    trend: "up",
    icon: TrendingUp,
    subtitle: "Faster cycles",
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className="size-3 sm:size-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-xl md:text-2xl">{metric.value}</span>
                <Badge variant="secondary" className="text-xs">
                  {metric.trend === "up" && <ArrowUp className="size-3 mr-1 inline" />}
                  {metric.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
