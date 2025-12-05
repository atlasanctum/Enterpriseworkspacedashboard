import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./ui/sidebar";
import {
  LayoutDashboard,
  Globe,
  Shield,
  Settings,
  Users,
  BarChart3,
  Workflow,
  FileText,
  MessageSquare,
  Brain,
  Database,
  AlertTriangle,
  ChevronRight,
  Bot,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { CountryContextSwitcher } from "./CountryContextSwitcher";
import { Button } from "./ui/button";

interface EnterpriseSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: "admin" | "data-officer" | "auditor" | "analyst";
}

export function EnterpriseSidebar({ currentView, onViewChange, userRole }: EnterpriseSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["governance"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Role-based navigation items
  const navigationItems = {
    core: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "data-officer", "auditor", "analyst"] },
      { id: "deployments", label: "Multi-Country Deployments", icon: Globe, roles: ["admin", "data-officer"], badge: "23" },
      { id: "beneficiaries", label: "Beneficiary Management", icon: Users, roles: ["admin", "data-officer"], badge: "12.4M" },
    ],
    governance: [
      { id: "fraud-detection", label: "Fraud Detection", icon: Shield, roles: ["admin", "auditor", "analyst"], badge: "3" },
      { id: "compliance", label: "Compliance Framework", icon: FileText, roles: ["admin", "auditor"] },
      { id: "audit-trails", label: "Audit Trails", icon: Database, roles: ["admin", "auditor"] },
    ],
    operations: [
      { id: "workflows", label: "Workflow Automation", icon: Workflow, roles: ["admin", "data-officer"] },
      { id: "analytics", label: "Predictive Analytics", icon: BarChart3, roles: ["admin", "analyst"] },
      { id: "reporting", label: "Reporting Engine", icon: FileText, roles: ["admin", "data-officer", "analyst"] },
    ],
    collaboration: [
      { id: "messaging", label: "Inter-Agency Chat", icon: MessageSquare, roles: ["admin", "data-officer", "auditor", "analyst"], badge: "12" },
      { id: "ai-assistant", label: "AI Governance Assistant", icon: Brain, roles: ["admin", "analyst"] },
    ],
  };

  const hasAccess = (roles: string[]) => roles.includes(userRole);

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground">🌐</span>
          </div>
          <div>
            <h3 className="text-sidebar-foreground">Enterprise Workspace</h3>
            <p className="text-xs text-sidebar-foreground/60">Unlimited Scale</p>
          </div>
        </div>
        <CountryContextSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {/* Core Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Core</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.core
                .filter(item => hasAccess(item.roles))
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onViewChange(item.id)}
                        isActive={currentView === item.id}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Governance & Security */}
        <SidebarGroup>
          <SidebarGroupLabel>Governance & Security</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.governance
                .filter(item => hasAccess(item.roles))
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onViewChange(item.id)}
                        isActive={currentView === item.id}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Operations */}
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.operations
                .filter(item => hasAccess(item.roles))
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onViewChange(item.id)}
                        isActive={currentView === item.id}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collaboration */}
        <SidebarGroup>
          <SidebarGroupLabel>Collaboration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.collaboration
                .filter(item => hasAccess(item.roles))
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onViewChange(item.id)}
                        isActive={currentView === item.id}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => onViewChange("ai-assistant")}
          >
            <Bot className="size-4 mr-2" />
            AI Command Search
          </Button>
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/60">
            <span>Role: {userRole}</span>
            <Settings className="size-3" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
