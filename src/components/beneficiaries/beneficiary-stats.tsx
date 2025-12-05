import { getBeneficiaryStats } from "@/lib/data/beneficiaries";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";

export async function BeneficiaryStats() {
  const stats = await getBeneficiaryStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
              <p className="text-2xl mt-1">{stats.total.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+18.2% from last quarter</p>
            </div>
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="size-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl mt-1">{stats.active.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.active / stats.total) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="size-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Verification</p>
              <p className="text-2xl mt-1">{stats.pending.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.pending / stats.total) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="size-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <UserCheck className="size-6 text-yellow-700 dark:text-yellow-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Flagged/Suspended</p>
              <p className="text-2xl mt-1">{stats.suspended.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.suspended / stats.total) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <AlertCircle className="size-6 text-red-700 dark:text-red-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
