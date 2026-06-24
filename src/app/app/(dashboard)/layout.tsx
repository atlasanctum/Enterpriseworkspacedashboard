import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

// Mock user for development
const mockUser = {
  id: "1",
  email: "admin@un-operations.org",
  name: "Sarah Mitchell",
  role: "admin" as const,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In production, use: const session = await getServerSession(authOptions);
  // For now, use mock user to allow development without authentication

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar user={mockUser} />
        <SidebarInset className="flex-1">
          <DashboardHeader user={mockUser} />
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
