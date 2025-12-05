import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const fraudData = [
  { month: "Apr", detections: 127, prevented: 123, accuracy: 96.8 },
  { month: "May", detections: 142, prevented: 138, accuracy: 97.2 },
  { month: "Jun", detections: 156, prevented: 151, accuracy: 96.8 },
  { month: "Jul", detections: 134, prevented: 130, accuracy: 97.0 },
  { month: "Aug", detections: 168, prevented: 163, accuracy: 97.0 },
  { month: "Sep", detections: 145, prevented: 141, accuracy: 97.2 },
  { month: "Oct", detections: 189, prevented: 183, accuracy: 96.8 },
];

export function FraudDetectionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Fraud Detection</CardTitle>
        <CardDescription>Anomaly detection and verification performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={fraudData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
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
            <Area
              type="monotone"
              dataKey="detections"
              stackId="1"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
              name="Detections"
            />
            <Area
              type="monotone"
              dataKey="prevented"
              stackId="2"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.6}
              name="Prevented"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
