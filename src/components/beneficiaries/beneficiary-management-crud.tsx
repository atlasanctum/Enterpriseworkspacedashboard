'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';
import { BeneficiaryForm } from '@/components/forms/beneficiary-form';
import { EditDialog } from '@/components/dialogs/edit-dialog';
import { toast } from 'sonner';

export function BeneficiaryManagementCRUD() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Beneficiary Management</h2>
          <p className="text-muted-foreground">
            Manage 12.4M beneficiaries across 23 countries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info('Import feature coming soon')}>
            <Upload className="size-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={() => toast.info('Export feature coming soon')}>
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="size-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>
      </div>

      {/* Create Dialog */}
      <EditDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        title="Create New Beneficiary"
        description="Add a new beneficiary to the system"
      >
        <BeneficiaryForm onCancel={() => setShowCreateDialog(false)} />
      </EditDialog>
    </div>
  );
}
