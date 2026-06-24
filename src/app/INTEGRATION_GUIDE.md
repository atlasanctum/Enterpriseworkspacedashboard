# 🔧 Integration Guide - Adding CRUD to Your App

## ✅ Build Error Fixed

The build error has been resolved. The issue was with dynamic imports in client components.

---

## 🎯 How to Add CRUD to Your Pages

You have **TWO** app structures:
1. **Old React SPA** - `/App.tsx` (current working version)
2. **New Next.js App** - `/app` folder (production-ready)

Both are ready! Choose which one to use:

---

## Option A: Use the React SPA (Current /App.tsx)

### Quick Integration Steps

#### 1. Add Dialog State to BeneficiaryManagement.tsx

```tsx
// At the top of the file, add imports
import { EditDialog } from './dialogs/edit-dialog';
import { DeleteConfirmation } from './dialogs/delete-confirmation';
import { BeneficiaryForm } from './forms/beneficiary-form';
import { toast } from 'sonner@2.0.3';

// In the component, add states
const [showCreateDialog, setShowCreateDialog] = useState(false);
const [editingBeneficiary, setEditingBeneficiary] = useState(null);
const [deletingId, setDeletingId] = useState(null);

// Replace the "Add" button in the header
<Button onClick={() => setShowCreateDialog(true)}>
  <Plus className="size-4 mr-2" />
  Add Beneficiary
</Button>

// Add dialogs before the closing </div>
<EditDialog
  open={showCreateDialog}
  onOpenChange={setShowCreateDialog}
  title="Create New Beneficiary"
>
  <BeneficiaryForm onCancel={() => setShowCreateDialog(false)} />
</EditDialog>
```

#### 2. Add Row Actions

Replace the actions in the table with:

```tsx
<CRUDTableActions
  item={beneficiary}
  itemType="Beneficiary"
  onView={() => {/* Navigate to details */}}
  onEdit={() => setEditingBeneficiary(beneficiary)}
  onDelete={() => setDeletingId(beneficiary.id)}
  editForm={<BeneficiaryForm beneficiary={beneficiary} />}
/>
```

#### 3. Add Toast Provider

In `/App.tsx`, wrap your app with Toaster:

```tsx
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <Toaster />
      <SidebarProvider>
        {/* ... rest of your app */}
      </SidebarProvider>
    </>
  );
}
```

---

## Option B: Use the Next.js App (/app folder)

### The Next.js version already has full CRUD!

Just run:
```bash
npm run dev
```

Navigate to: http://localhost:3000

All pages have built-in CRUD:
- `/beneficiaries` - Full CRUD with forms
- `/fraud-detection` - Create, edit, delete cases
- `/workflows` - Manage workflows
- `/deployments` - Country management
- `/messaging` - Send, edit, delete messages

---

## 🚀 Quick Start for Each Module

### Beneficiaries (React SPA)

```tsx
// In BeneficiaryManagement.tsx
import { useState } from 'react';
import { EditDialog } from './dialogs/edit-dialog';
import { BeneficiaryForm } from './forms/beneficiary-form';
import { CRUDTableActions } from './crud/crud-table-actions';

export function BeneficiaryManagement() {
  const [showCreate, setShowCreate] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setShowCreate(true)}>Add</Button>
      
      <Table>
        {beneficiaries.map(b => (
          <TableRow key={b.id}>
            <TableCell>{b.name}</TableCell>
            <TableCell>
              <CRUDTableActions
                item={b}
                itemType="Beneficiary"
                editForm={<BeneficiaryForm beneficiary={b} />}
                onDelete={async () => {
                  // Delete logic here
                  console.log('Delete', b.id);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
      
      <EditDialog open={showCreate} onOpenChange={setShowCreate} title="Create">
        <BeneficiaryForm />
      </EditDialog>
    </div>
  );
}
```

### Fraud Detection

```tsx
// In FraudDetectionModule.tsx
import { FraudCaseForm } from './forms/fraud-case-form';

// Add create button
<Button onClick={() => setShowReportCase(true)}>
  <Plus className="size-4 mr-2" />
  Report Fraud Case
</Button>

// Add dialog
<EditDialog open={showReportCase} onOpenChange={setShowReportCase} title="Report Case">
  <FraudCaseForm />
</EditDialog>
```

### Workflows

```tsx
// In WorkflowAutomationStudio.tsx
import { WorkflowForm } from './forms/workflow-form';

// Add create button
<Button onClick={() => setShowCreate(true)}>
  <Plus className="size-4 mr-2" />
  Create Workflow
</Button>

// Add dialog
<EditDialog open={showCreate} onOpenChange={setShowCreate} title="Create Workflow">
  <WorkflowForm />
</EditDialog>
```

---

## 📦 Required Packages

Make sure these are in your `package.json`:

```json
{
  "dependencies": {
    "sonner": "^1.3.1",
    "zod": "^3.22.4",
    "react-hook-form": "^7.55.0"
  }
}
```

Install if missing:
```bash
npm install sonner@1.3.1 zod@3.22.4 react-hook-form@7.55.0
```

---

## 🎨 Components Available

### Forms (in /components/forms/)
- ✅ `beneficiary-form.tsx` - Create/edit beneficiaries
- ✅ `fraud-case-form.tsx` - Report fraud cases
- ✅ `workflow-form.tsx` - Create workflows
- ✅ `deployment-form.tsx` - Manage deployments

### Dialogs (in /components/dialogs/)
- ✅ `edit-dialog.tsx` - Modal for create/edit
- ✅ `delete-confirmation.tsx` - Confirm delete

### CRUD Utilities (in /components/crud/)
- ✅ `crud-table-actions.tsx` - Row action menu
- ✅ `crud-data-table.tsx` - Full table wrapper

---

## 🔌 Server Actions (Backend)

All in `/lib/actions/`:

```typescript
// Example: Using a server action
import { createBeneficiary } from '@/lib/actions/beneficiaries';

// In a form component
const [state, formAction] = useFormState(createBeneficiary, initialState);

// In JSX
<form action={formAction}>
  <Input name="name" />
  <Button type="submit">Create</Button>
</form>
```

**Note**: Server actions work in Next.js. For React SPA, you'll need to:
1. Convert them to API calls
2. Or switch to the Next.js app structure

---

## 🎯 Recommended Approach

### For Quick Demo (Keep React SPA)

1. Add toast notifications
2. Add dialog states
3. Use forms in dialogs
4. Mock the save operations (console.log for now)

### For Production (Use Next.js)

1. Switch to `/app` folder structure
2. Everything is already wired up
3. Connect to your database
4. Deploy to Vercel

---

## 📝 Example: Complete Integration

Here's a complete example for BeneficiaryManagement.tsx:

```tsx
'use client'; // Only needed if using Next.js

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Search } from 'lucide-react';
import { Input } from './ui/input';
import { EditDialog } from './dialogs/edit-dialog';
import { BeneficiaryForm } from './forms/beneficiary-form';
import { CRUDTableActions } from './crud/crud-table-actions';
import { toast } from 'sonner@2.0.3';

const mockBeneficiaries = [
  { id: '1', name: 'Ahmed Hassan', country: 'Yemen', status: 'active' },
  { id: '2', name: 'Fatima Al-Rashid', country: 'Syria', status: 'active' },
];

export function BeneficiaryManagement() {
  const [showCreate, setShowCreate] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState(mockBeneficiaries);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (id: string) => {
    setBeneficiaries(prev => prev.filter(b => b.id !== id));
    toast.success('Beneficiary deleted');
  };

  const filteredData = beneficiaries.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Beneficiary Management</h2>
          <p className="text-muted-foreground">
            Manage 12.4M beneficiaries
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="size-4 mr-2" />
          Add Beneficiary
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" />
        <Input
          placeholder="Search beneficiaries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Beneficiaries ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((beneficiary) => (
                <TableRow key={beneficiary.id}>
                  <TableCell>{beneficiary.id}</TableCell>
                  <TableCell>{beneficiary.name}</TableCell>
                  <TableCell>{beneficiary.country}</TableCell>
                  <TableCell>{beneficiary.status}</TableCell>
                  <TableCell>
                    <CRUDTableActions
                      item={beneficiary}
                      itemType="Beneficiary"
                      editForm={<BeneficiaryForm beneficiary={beneficiary} />}
                      onDelete={() => handleDelete(beneficiary.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <EditDialog
        open={showCreate}
        onOpenChange={setShowCreate}
        title="Create Beneficiary"
      >
        <BeneficiaryForm onCancel={() => setShowCreate(false)} />
      </EditDialog>
    </div>
  );
}
```

---

## 🎉 You're All Set!

Choose your approach:
- **Quick & Easy**: Keep `/App.tsx`, add dialogs manually
- **Production Ready**: Use `/app` folder, everything is wired

Both work! The Next.js version has more features and is production-ready.

---

## 🆘 Troubleshooting

**Q: Forms not submitting?**
A: Make sure you're using the Next.js app structure for server actions to work.

**Q: Toast notifications not showing?**
A: Add `<Toaster />` to your root component and import from `sonner@2.0.3`.

**Q: Build errors?**
A: Avoid dynamic imports with `@/` in client components. Use regular imports at the top.

**Q: Want to use forms in React SPA?**
A: Convert server actions to API calls or state management.

---

**Last Updated**: October 12, 2025  
**Status**: ✅ Build errors fixed, ready to integrate
