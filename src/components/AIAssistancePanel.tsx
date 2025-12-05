import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Brain, TrendingUp, AlertTriangle, Users, Send, Sparkles } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const aiSuggestions = [
  {
    type: "insight",
    icon: TrendingUp,
    title: "Resource Optimization Detected",
    description: "AI suggests redistributing 15% of Ethiopia's supply chain resources to South Sudan based on predictive demand modeling.",
    confidence: 94,
    impact: "High",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Anomaly Pattern Identified",
    description: "Unusual beneficiary registration spike in Yemen (23% above forecast). Recommend verification workflow activation.",
    confidence: 87,
    impact: "Medium",
  },
  {
    type: "forecast",
    icon: Users,
    title: "Beneficiary Growth Forecast",
    description: "Predictive models indicate 18% increase in Bangladesh beneficiaries over next quarter. Recommend capacity scaling.",
    confidence: 91,
    impact: "High",
  },
];

const quickCommands = [
  "Show fraud detection summary for this month",
  "Compare deployment efficiency across regions",
  "Generate World Bank compliance report",
  "Forecast resource needs for Q4 2025",
];

export function AIAssistancePanel() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([]);

  const handleSend = () => {
    if (!query.trim()) return;
    
    setMessages(prev => [
      ...prev,
      { type: "user", content: query },
      { 
        type: "ai", 
        content: "I'm analyzing your request across all 23 country deployments. Based on current data, I can provide insights on fraud patterns, resource allocation, and compliance status. How would you like me to proceed?"
      }
    ]);
    setQuery("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-5" />
            AI Governance Assistant
          </CardTitle>
          <CardDescription>
            Contextual AI recommendations and predictive insights powered by humanitarian data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* AI Suggestions */}
            <div className="space-y-3">
              <h4 className="text-sm text-muted-foreground">Recommended Actions</h4>
              {aiSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <div key={index} className="p-4 rounded-lg border border-border bg-accent/30">
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm">{suggestion.title}</h4>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {suggestion.confidence}% confidence
                            </Badge>
                            <Badge 
                              variant={suggestion.impact === "High" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {suggestion.impact}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {suggestion.description}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm">Apply Recommendation</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Chat Interface */}
            <div className="space-y-3">
              <h4 className="text-sm text-muted-foreground">AI Command Search</h4>
              
              {messages.length > 0 && (
                <ScrollArea className="h-[200px] rounded-lg border p-4">
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Ask AI to analyze patterns, generate reports, or forecast trends..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  <Send className="size-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickCommands.map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(command)}
                  >
                    <Sparkles className="size-3 mr-1" />
                    {command}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
