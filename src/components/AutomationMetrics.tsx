import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const automationData = [
  { workflow: "Registration", manual: 45, automated: 8, savings: 82 },
  { workflow: "Verification", manual: 60, automated: 12, savings: 80 },
  { workflow: "Distribution", manual: 38, automated: 9, savings: 76 },
  { workflow: "Reporting", manual: 72, automated: 15, savings: 79 },
  { workflow: "Compliance", manual: 52, automated: 11, savings: 79 },
];

export function AutomationMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Automation Impact</CardTitle>
        <CardDescription>Time reduction across core humanitarian workflows (hours)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={automationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="workflow" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius-md)",
              }}
            />
            <Legend />
            <Bar 
              dataKey="manual" 
              fill="hsl(var(--chart-3))" 
              name="Manual (before)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="automated" 
              fill="hsl(var(--chart-2))" 
              name="Automated (now)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
