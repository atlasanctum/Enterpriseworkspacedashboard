import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const beneficiaries = [
  {
    id: "BEN-2025-892341",
    name: "Ahmed M. Hassan",
    age: 34,
    gender: "Male",
    country: "Yemen",
    region: "Sana'a",
    registrationDate: "2024-03-15",
    status: "active",
    verificationType: "Biometric",
    householdSize: 6,
    lastDistribution: "2025-10-05",
    totalAid: "$2,340"
  },
  {
    id: "BEN-2025-892340",
    name: "Fatima Al-Rashid",
    age: 28,
    gender: "Female",
    country: "Syria",
    region: "Damascus",
    registrationDate: "2024-08-22",
    status: "active",
    verificationType: "Biometric + Document",
    householdSize: 4,
    lastDistribution: "2025-10-08",
    totalAid: "$1,890"
  },
  {
    id: "BEN-2025-892339",
    name: "Mary K. Johnson",
    age: 42,
    gender: "Female",
    country: "South Sudan",
    region: "Juba",
    registrationDate: "2023-11-30",
    status: "suspended",
    verificationType: "Document Only",
    householdSize: 8,
    lastDistribution: "2025-09-12",
    totalAid: "$4,120"
  },
  {
    id: "BEN-2025-892338",
    name: "Abebe Desta",
    age: 51,
    gender: "Male",
    country: "Ethiopia",
    region: "Addis Ababa",
    registrationDate: "2024-01-10",
    status: "active",
    verificationType: "Biometric",
    householdSize: 5,
    lastDistribution: "2025-10-10",
    totalAid: "$3,560"
  },
  {
    id: "BEN-2025-892337",
    name: "Rashid Khan",
    age: 29,
    gender: "Male",
    country: "Bangladesh",
    region: "Dhaka",
    registrationDate: "2024-05-18",
    status: "pending-verification",
    verificationType: "Pending",
    householdSize: 3,
    lastDistribution: "-",
    totalAid: "$0"
  },
  {
    id: "BEN-2025-892336",
    name: "Amina Ibrahim",
    age: 36,
    gender: "Female",
    country: "Nigeria",
    region: "Lagos",
    registrationDate: "2024-07-02",
    status: "active",
    verificationType: "Biometric",
    householdSize: 7,
    lastDistribution: "2025-10-09",
    totalAid: "$2,780"
  },
];

export function BeneficiaryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState<typeof beneficiaries[0] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === "all" || beneficiary.country === countryFilter;
    const matchesStatus = statusFilter === "all" || beneficiary.status === statusFilter;
    return matchesSearch && matchesCountry && matchesStatus;
  });

  const toggleBeneficiary = (id: string) => {
    setSelectedBeneficiaries(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedBeneficiaries.length === filteredBeneficiaries.length) {
      setSelectedBeneficiaries([]);
    } else {
      setSelectedBeneficiaries(filteredBeneficiaries.map(b => b.id));
    }
  };

  const handleDelete = (id: string) => {
    // In production, call deleteBeneficiary server action
    console.log('Delete beneficiary:', id);
    // TODO: Implement delete with server action
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Beneficiary Management</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage 12.4M beneficiaries across 23 countries
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="sm:size-default">
            <Upload className="size-4 mr-2" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          <Button variant="outline" size="sm" className="sm:size-default">
            <Download className="size-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button size="sm" className="sm:size-default">
            <Plus className="size-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Total Beneficiaries</p>
                <p className="text-xl md:text-2xl mt-1">12,427,384</p>
                <p className="text-xs text-green-600 mt-1">+18.2% from last quarter</p>
              </div>
              <div className="size-10 sm:size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="size-5 sm:size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl mt-1">11,892,104</p>
                <p className="text-xs text-muted-foreground mt-1">95.7% of total</p>
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
                <p className="text-2xl mt-1">342,891</p>
                <p className="text-xs text-muted-foreground mt-1">2.8% of total</p>
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
                <p className="text-2xl mt-1">192,389</p>
                <p className="text-xs text-muted-foreground mt-1">1.5% of total</p>
              </div>
              <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertCircle className="size-6 text-red-700 dark:text-red-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Beneficiary List</TabsTrigger>
          <TabsTrigger value="households">Households</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4 mt-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-4 md:pt-6">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="w-[140px] sm:w-[180px]">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="Yemen">Yemen</SelectItem>
                      <SelectItem value="Syria">Syria</SelectItem>
                      <SelectItem value="South Sudan">South Sudan</SelectItem>
                      <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] sm:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending-verification">Pending Verification</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="shrink-0" size="sm" className="sm:size-default">
                    <Filter className="size-4 sm:mr-2" />
                    <span className="hidden sm:inline">More</span>
                  </Button>
                </div>
              </div>

              {selectedBeneficiaries.length > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm">
                    {selectedBeneficiaries.length} beneficiaries selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Bulk Edit</Button>
                    <Button size="sm" variant="outline">Export Selected</Button>
                    <Button size="sm" variant="outline">Send Notification</Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedBeneficiaries([])}>
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Beneficiaries Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Beneficiaries ({filteredBeneficiaries.length.toLocaleString()})</CardTitle>
              <CardDescription className="text-sm">View and manage individual beneficiary records</CardDescription>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedBeneficiaries.length === filteredBeneficiaries.length}
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Household</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Last Distribution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedBeneficiaries.includes(beneficiary.id)}
                          onCheckedChange={() => toggleBeneficiary(beneficiary.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{beneficiary.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{beneficiary.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Reg: {beneficiary.registrationDate}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{beneficiary.age} years</p>
                          <p className="text-muted-foreground">{beneficiary.gender}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-1">
                          <MapPin className="size-3 mt-0.5 shrink-0" />
                          <div className="text-sm">
                            <p>{beneficiary.country}</p>
                            <p className="text-muted-foreground">{beneficiary.region}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {beneficiary.householdSize} members
                      </TableCell>
                      <TableCell>
                        <Badge variant={beneficiary.verificationType.includes("Biometric") ? "default" : "secondary"}>
                          {beneficiary.verificationType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {beneficiary.lastDistribution}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            beneficiary.status === "active" ? "default" :
                            beneficiary.status === "suspended" ? "destructive" :
                            "secondary"
                          }
                        >
                          {beneficiary.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="size-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="size-4 mr-2" />
                              Distribution History
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="size-4 mr-2" />
                              Export Record
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="size-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="households" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Household Overview</CardTitle>
              <CardDescription>Manage family units and household compositions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="size-16 mx-auto text-muted-foreground mb-4" />
                <h3>Household Management</h3>
                <p className="text-muted-foreground mt-2">
                  View and manage household structures, family relationships, and dependency tracking
                </p>
                <Button className="mt-4">View Households</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Demographic Analytics</CardTitle>
              <CardDescription>Population insights and distribution patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="size-16 mx-auto text-muted-foreground mb-4" />
                <h3>Demographics Dashboard</h3>
                <p className="text-muted-foreground mt-2">
                  Age distribution, gender ratios, geographic spread, and vulnerability assessments
                </p>
                <Button className="mt-4">View Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
