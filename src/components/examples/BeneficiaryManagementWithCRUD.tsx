'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Search, 
  Filter, 
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditDialog } from "../dialogs/edit-dialog";
import { DeleteConfirmation } from "../dialogs/delete-confirmation";
import { BeneficiaryForm } from "../forms/beneficiary-form";
import { toast } from "sonner@2.0.3";

const initialBeneficiaries = [
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
  }
];

export function BeneficiaryManagementWithCRUD() {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState<typeof initialBeneficiaries[0] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === "all" || beneficiary.country === countryFilter;
    const matchesStatus = statusFilter === "all" || beneficiary.status === statusFilter;
    return matchesSearch && matchesCountry && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    setBeneficiaries(prev => prev.filter(b => b.id !== id));
    toast.success('Beneficiary deleted successfully');
  };

  const handleViewDetails = (id: string) => {
    toast.info(`View details for ${id}`);
    // In real app: navigate to /beneficiaries/${id}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Beneficiary Management</h2>
          <p className="text-muted-foreground">
            Manage 12.4M beneficiaries across 23 countries
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
              <p className="text-2xl">12.4M</p>
              <p className="text-xs text-green-600">+18.2% from last quarter</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl">11.8M</p>
              <p className="text-xs text-muted-foreground">95.2% of total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl">423K</p>
              <p className="text-xs text-muted-foreground">3.4% of total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Flagged</p>
              <p className="text-2xl">167K</p>
              <p className="text-xs text-muted-foreground">1.4% of total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Yemen">Yemen</SelectItem>
                <SelectItem value="Syria">Syria</SelectItem>
                <SelectItem value="South Sudan">South Sudan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending-verification">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              More
            </Button>
            <Button variant="outline">
              <Upload className="size-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="size-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Beneficiaries ({filteredBeneficiaries.length})</CardTitle>
          <CardDescription>View and manage individual beneficiary records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Household</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id}>
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
                    <Badge variant={beneficiary.verificationType.includes('Biometric') ? 'default' : 'secondary'}>
                      {beneficiary.verificationType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        beneficiary.status === 'active' ? 'default' :
                        beneficiary.status === 'suspended' ? 'destructive' :
                        'secondary'
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
                        <DropdownMenuItem onClick={() => handleViewDetails(beneficiary.id)}>
                          <Eye className="size-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingBeneficiary(beneficiary)}>
                          <Edit className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setDeletingId(beneficiary.id)}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <EditDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        title="Create New Beneficiary"
        description="Add a new beneficiary to the system"
      >
        <BeneficiaryForm onCancel={() => setShowCreateDialog(false)} />
      </EditDialog>

      {/* Edit Dialog */}
      <EditDialog
        open={!!editingBeneficiary}
        onOpenChange={(open) => !open && setEditingBeneficiary(null)}
        title="Edit Beneficiary"
        description="Update beneficiary information"
      >
        {editingBeneficiary && (
          <BeneficiaryForm 
            beneficiary={editingBeneficiary}
            onCancel={() => setEditingBeneficiary(null)}
          />
        )}
      </EditDialog>

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
        onConfirm={async () => {
          if (deletingId) {
            await handleDelete(deletingId);
            setDeletingId(null);
          }
        }}
        title="Delete Beneficiary?"
        description="Are you sure you want to delete this beneficiary?"
        itemName={beneficiaries.find(b => b.id === deletingId)?.name}
      />
    </div>
  );
}
