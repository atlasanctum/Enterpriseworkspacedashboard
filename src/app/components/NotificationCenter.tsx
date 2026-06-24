import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const notifications = [
  {
    id: 1,
    type: "fraud",
    severity: "high",
    title: "Fraud Alert: Duplicate Registration",
    message: "3 potential duplicate beneficiary records detected in Yemen deployment",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "sla",
    severity: "medium",
    title: "SLA Warning: Bangladesh",
    message: "API response time approaching threshold (142ms avg)",
    time: "23 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "field",
    severity: "urgent",
    title: "Field Update: South Sudan",
    message: "Field team reporting connectivity issues in Juba region",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    type: "deployment",
    severity: "low",
    title: "Deployment Success: Haiti",
    message: "New country deployment completed successfully. 410K beneficiaries onboarded.",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "compliance",
    severity: "medium",
    title: "Compliance Review Due",
    message: "Quarterly GDPR compliance audit scheduled for next week",
    time: "3 hours ago",
    unread: false,
  },
];

export function NotificationCenter() {
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Real-time alerts for fraud, SLA breaches, and field updates
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className={`p-4 rounded-lg border ${notification.unread ? 'bg-accent/50 border-primary/20' : 'border-border'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm">{notification.title}</h4>
                        {notification.unread && (
                          <div className="size-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Badge 
                      variant={
                        notification.severity === "urgent" ? "destructive" :
                        notification.severity === "high" ? "destructive" :
                        notification.severity === "medium" ? "secondary" :
                        "outline"
                      }
                    >
                      {notification.severity}
                    </Badge>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
