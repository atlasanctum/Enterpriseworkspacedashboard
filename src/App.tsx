import { useState } from "react";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/sonner";
import { EnterpriseSidebar } from "./components/EnterpriseSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardView } from "./components/DashboardView";
import { WorkflowAutomationStudio } from "./components/WorkflowAutomationStudio";
import { ReportingEngine } from "./components/ReportingEngine";
import { AIAssistancePanel } from "./components/AIAssistancePanel";
import { DeploymentMap } from "./components/DeploymentMap";
import { ComplianceStatus } from "./components/ComplianceStatus";
import { FraudDetectionModule } from "./components/FraudDetectionModule";
import { BeneficiaryManagement } from "./components/BeneficiaryManagement";
import { AuditTrails } from "./components/AuditTrails";
import { PredictiveAnalytics } from "./components/PredictiveAnalytics";
import { InterAgencyMessaging } from "./components/InterAgencyMessaging";
import { ComplianceFrameworkConfig } from "./components/ComplianceFrameworkConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [userRole] = useState<"admin" | "data-officer" | "auditor" | "analyst">("admin");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "workflows":
        return <WorkflowAutomationStudio />;
      case "reporting":
        return <ReportingEngine />;
      case "ai-assistant":
        return <AIAssistancePanel />;
      case "deployments":
        return (
          <div className="space-y-6">
            <div>
              <h2>Multi-Country Deployments</h2>
              <p className="text-muted-foreground">
                Manage and monitor deployments across 23 countries
              </p>
            </div>
            <DeploymentMap />
          </div>
        );
      case "compliance":
        return (
          <div className="space-y-6">
            <div>
              <h2>Compliance Framework Manager</h2>
              <p className="text-muted-foreground">
                Configure and monitor compliance across global regulatory frameworks
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ComplianceStatus />
              <ComplianceFrameworkConfig />
            </div>
          </div>
        );
      case "fraud-detection":
        return <FraudDetectionModule />;
      case "beneficiaries":
        return <BeneficiaryManagement />;
      case "audit-trails":
        return <AuditTrails />;
      case "analytics":
        return <PredictiveAnalytics />;
      case "messaging":
        return <InterAgencyMessaging />;
      default:
        return <DashboardView />;
    }
  };

  const getViewTitle = (view: string) => {
    const titles: Record<string, string> = {
      "fraud-detection": "Advanced Fraud Detection",
      "beneficiaries": "Beneficiary Management",
      "audit-trails": "Audit Trails & Compliance",
      "analytics": "Predictive Analytics Dashboard",
      "messaging": "Inter-Agency Collaboration",
    };
    return titles[view] || "Dashboard";
  };

  const getViewDescription = (view: string) => {
    const descriptions: Record<string, string> = {
      "fraud-detection": "AI-powered anomaly detection and verification across all deployments",
      "beneficiaries": "Manage 12.4M beneficiaries across 23 countries",
      "audit-trails": "Complete audit history and compliance tracking",
      "analytics": "Predictive models for resource allocation and crisis forecasting",
      "messaging": "Secure inter-agency communication and shared dashboards",
    };
    return descriptions[view] || "";
  };

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <EnterpriseSidebar 
            currentView={currentView} 
            onViewChange={setCurrentView}
            userRole={userRole}
          />
          <SidebarInset className="flex-1">
            <DashboardHeader userRole={userRole} />
            <main className="p-3 sm:p-4 md:p-6">
              {renderView()}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
