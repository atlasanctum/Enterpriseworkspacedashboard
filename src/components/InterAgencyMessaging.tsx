import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { 
  MessageSquare, 
  Send,
  Users,
  Share2,
  PlusCircle,
  Search,
  Pin,
  Paperclip,
  MoreVertical,
  Hash,
  Bell,
  BellOff
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const channels = [
  { id: 1, name: "global-coordination", unread: 3, pinned: true, members: 247 },
  { id: 2, name: "east-africa-ops", unread: 12, pinned: true, members: 89 },
  { id: 3, name: "fraud-alerts", unread: 2, pinned: false, members: 156 },
  { id: 4, name: "data-analytics", unread: 0, pinned: false, members: 34 },
  { id: 5, name: "compliance-updates", unread: 5, pinned: false, members: 78 },
];

const directMessages = [
  { id: 1, name: "Sarah Mitchell", role: "Admin", unread: 2, online: true },
  { id: 2, name: "James Chen", role: "Auditor", unread: 0, online: true },
  { id: 3, name: "Maria Rodriguez", role: "Analyst", unread: 1, online: false },
  { id: 4, name: "Abebe Worku", role: "Data Officer", unread: 0, online: true },
];

const messages = [
  {
    id: 1,
    user: "Sarah Mitchell",
    role: "UN Global Operations",
    timestamp: "10:23 AM",
    message: "Team, we've detected an unusual spike in beneficiary registrations in Yemen. Can someone from the fraud detection team review this?",
    avatar: "SM",
    pinned: false,
  },
  {
    id: 2,
    user: "James Chen",
    role: "World Bank Auditor",
    timestamp: "10:27 AM",
    message: "I'm on it. Running the anomaly detection model now. Initial scan shows 23 potential duplicates in the Sana'a region.",
    avatar: "JC",
    pinned: false,
  },
  {
    id: 3,
    user: "Maria Rodriguez",
    role: "Data Analyst",
    timestamp: "10:31 AM",
    message: "Cross-referencing with Syria deployment data. Found 7 potential cross-border duplicates. Flagging for manual review.",
    avatar: "MR",
    pinned: false,
  },
  {
    id: 4,
    user: "Abebe Worku",
    role: "Ethiopia Data Officer",
    timestamp: "10:35 AM",
    message: "Good catch! We implemented enhanced biometric verification last month which reduced our duplicates by 43%. Happy to share the protocol.",
    avatar: "AW",
    pinned: true,
  },
  {
    id: 5,
    user: "Sarah Mitchell",
    role: "UN Global Operations",
    timestamp: "10:38 AM",
    message: "@Abebe That would be excellent. Please share the protocol document in the #compliance-updates channel. Let's schedule a sync for tomorrow at 14:00 UTC to discuss rollout.",
    avatar: "SM",
    pinned: false,
  },
];

const sharedDashboards = [
  {
    id: 1,
    name: "Global Operations Overview",
    description: "Real-time metrics across all 23 countries",
    sharedBy: "Sarah Mitchell",
    viewers: 156,
    lastUpdated: "2 minutes ago",
  },
  {
    id: 2,
    name: "Fraud Detection Analytics",
    description: "AI-powered fraud patterns and alerts",
    sharedBy: "James Chen",
    viewers: 89,
    lastUpdated: "1 hour ago",
  },
  {
    id: 3,
    name: "Resource Allocation Forecast",
    description: "Predictive models for Q4 2025",
    sharedBy: "Maria Rodriguez",
    viewers: 67,
    lastUpdated: "3 hours ago",
  },
];

export function InterAgencyMessaging() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle message sending
      setMessageText("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Inter-Agency Collaboration</h2>
          <p className="text-muted-foreground">
            Secure communication and shared dashboards across organizations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="size-4 mr-2" />
            Directory
          </Button>
          <Button>
            <PlusCircle className="size-4 mr-2" />
            New Channel
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl mt-1">342</p>
                <p className="text-xs text-green-600 mt-1">89 online now</p>
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
                <p className="text-sm text-muted-foreground">Channels</p>
                <p className="text-2xl mt-1">24</p>
                <p className="text-xs text-muted-foreground mt-1">5 active discussions</p>
              </div>
              <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Hash className="size-6 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages Today</p>
                <p className="text-2xl mt-1">1,247</p>
                <p className="text-xs text-muted-foreground mt-1">Across all channels</p>
              </div>
              <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <MessageSquare className="size-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shared Dashboards</p>
                <p className="text-2xl mt-1">18</p>
                <p className="text-xs text-muted-foreground mt-1">Real-time collaboration</p>
              </div>
              <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Share2 className="size-6 text-purple-700 dark:text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="channels" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="channels" className="flex-1">Channels</TabsTrigger>
              <TabsTrigger value="dms" className="flex-1">DMs</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input placeholder="Search channels..." className="pl-8" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1 p-4 pt-0">
                      {channels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => setSelectedChannel(channel)}
                          className={`w-full text-left p-2 rounded-lg hover:bg-accent transition-colors ${
                            selectedChannel.id === channel.id ? "bg-accent" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Hash className="size-4 text-muted-foreground" />
                              <span className="text-sm">{channel.name}</span>
                              {channel.pinned && <Pin className="size-3 text-muted-foreground" />}
                            </div>
                            {channel.unread > 0 && (
                              <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center px-1">
                                {channel.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{channel.members} members</p>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dms" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input placeholder="Search people..." className="pl-8" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1 p-4 pt-0">
                      {directMessages.map((dm) => (
                        <button
                          key={dm.id}
                          className="w-full text-left p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <Avatar className="size-8">
                                  <AvatarFallback>{dm.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                {dm.online && (
                                  <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-card" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm">{dm.name}</p>
                                <p className="text-xs text-muted-foreground">{dm.role}</p>
                              </div>
                            </div>
                            {dm.unread > 0 && (
                              <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center px-1">
                                {dm.unread}
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="size-5" />
                  <div>
                    <CardTitle>{selectedChannel.name}</CardTitle>
                    <CardDescription>{selectedChannel.members} members</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Bell className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pin className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.pinned ? "bg-accent/30 -mx-4 px-4 py-2 rounded-lg" : ""}`}>
                    <Avatar>
                      <AvatarFallback>{msg.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-medium">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.role}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        {msg.pinned && <Pin className="size-3 text-muted-foreground" />}
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    placeholder={`Message #${selectedChannel.name}...`}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[60px] resize-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 left-2"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} className="self-end">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Shared Dashboards */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shared Dashboards</CardTitle>
              <CardDescription>Real-time collaborative analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sharedDashboards.map((dashboard) => (
                  <div
                    key={dashboard.id}
                    className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4>{dashboard.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {dashboard.description}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Shared by {dashboard.sharedBy}</span>
                          <span>•</span>
                          <span>{dashboard.viewers} viewers</span>
                          <span>•</span>
                          <span>Updated {dashboard.lastUpdated}</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        <Share2 className="size-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
