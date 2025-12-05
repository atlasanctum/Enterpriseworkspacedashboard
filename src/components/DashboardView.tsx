import { MetricsGrid } from "./MetricsGrid";
import { DeploymentMap } from "./DeploymentMap";
import { FraudDetectionChart } from "./FraudDetectionChart";
import { AutomationMetrics } from "./AutomationMetrics";
import { ComplianceStatus } from "./ComplianceStatus";
import { SupportPanel } from "./SupportPanel";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Sparkles, TrendingUp } from "lucide-react";

export function DashboardView() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      <Alert className="border-primary/20 bg-primary/5">
        <Sparkles className="size-4" />
        <AlertTitle>Welcome to Enterprise Workspace</AlertTitle>
        <AlertDescription className="text-sm md:text-base">
          <span className="italic block sm:inline">"Govern with insight. Respond with precision. Scale without limits."</span>
          <span className="sm:ml-2 block sm:inline mt-1 sm:mt-0">— Managing 12.4M beneficiaries across 23 countries with 99.97% uptime</span>
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <section>
        <h2 className="mb-3 md:mb-4">Performance Overview</h2>
        <MetricsGrid />
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <FraudDetectionChart />
        <AutomationMetrics />
      </section>

      {/* Deployments */}
      <section>
        <DeploymentMap />
      </section>

      {/* Compliance and Support */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ComplianceStatus />
        
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900">
          <TrendingUp className="size-4 text-green-700 dark:text-green-400" />
          <AlertTitle className="text-green-900 dark:text-green-100">
            Intervention Efficiency: +64%
          </AlertTitle>
          <AlertDescription className="text-green-800 dark:text-green-200 text-sm md:text-base">
            Your platform has accelerated humanitarian intervention cycles by 64% compared to baseline operations. 
            This translates to faster aid delivery, reduced operational costs by 78%, and improved beneficiary satisfaction scores.
          </AlertDescription>
        </Alert>
      </section>

      {/* Support and System Info */}
      <section>
        <SupportPanel />
      </section>
    </div>
  );
}
