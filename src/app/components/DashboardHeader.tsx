import { Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NotificationCenter } from "./NotificationCenter";
import { SidebarTrigger } from "./ui/sidebar";

interface DashboardHeaderProps {
  userRole?: "admin" | "data-officer" | "auditor" | "analyst";
}

export function DashboardHeader({ userRole = "admin" }: DashboardHeaderProps) {
  const roleLabels = {
    admin: "Administrator",
    "data-officer": "Data Officer",
    auditor: "Auditor",
    analyst: "Analyst",
  };

  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground">🌐</span>
            </div>
            <div>
              <h1 className="text-foreground">Enterprise Workspace</h1>
              <p className="text-muted-foreground text-sm">Unlimited Scale</p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2">
            Active
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <NotificationCenter />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p>UN Global Operations</p>
                  <p className="text-muted-foreground text-sm">admin@un-operations.org</p>
                  <Badge variant="outline" className="mt-1">
                    {roleLabels[userRole]}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="size-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
