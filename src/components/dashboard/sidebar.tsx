'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from '../ui/sidebar';
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
  Bot,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CountryContextSwitcher } from '../CountryContextSwitcher';

interface DashboardSidebarProps {
  user: any;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigation = {
    core: [
      { href: '/', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/deployments', label: 'Multi-Country Deployments', icon: Globe, badge: '23' },
      { href: '/beneficiaries', label: 'Beneficiary Management', icon: Users, badge: '12.4M' },
    ],
    governance: [
      { href: '/fraud-detection', label: 'Fraud Detection', icon: Shield, badge: '3' },
      { href: '/compliance', label: 'Compliance Framework', icon: FileText },
      { href: '/audit-trails', label: 'Audit Trails', icon: Database },
    ],
    operations: [
      { href: '/workflows', label: 'Workflow Automation', icon: Workflow },
      { href: '/analytics', label: 'Predictive Analytics', icon: BarChart3 },
      { href: '/reporting', label: 'Reporting Engine', icon: FileText },
    ],
    collaboration: [
      { href: '/messaging', label: 'Inter-Agency Chat', icon: MessageSquare, badge: '12' },
      { href: '/ai-assistant', label: 'AI Governance Assistant', icon: Brain },
    ],
  };

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
        <SidebarGroup>
          <SidebarGroupLabel>Core</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.core.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Governance & Security</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.governance.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.operations.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Collaboration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.collaboration.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
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
            asChild
          >
            <Link href="/ai-assistant">
              <Bot className="size-4 mr-2" />
              AI Command Search
            </Link>
          </Button>
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/60">
            <span>Role: {user.role}</span>
            <Settings className="size-3" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
