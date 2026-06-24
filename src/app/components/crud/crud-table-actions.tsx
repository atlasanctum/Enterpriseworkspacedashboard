'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2, Eye, MoreVertical, Copy } from 'lucide-react';
import { DeleteConfirmation } from '@/components/dialogs/delete-confirmation';
import { EditDialog } from '@/components/dialogs/edit-dialog';
import { toast } from 'sonner';

interface CRUDTableActionsProps {
  item: any;
  itemType: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
  onDuplicate?: () => void;
  editForm?: React.ReactNode;
}

export function CRUDTableActions({
  item,
  itemType,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  editForm,
}: CRUDTableActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      try {
        await onDelete();
        toast.success(`${itemType} deleted successfully`);
      } catch (error) {
        toast.error(`Failed to delete ${itemType}`);
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onView && (
            <DropdownMenuItem onClick={onView}>
              <Eye className="size-4 mr-2" />
              View Details
            </DropdownMenuItem>
          )}
          {(onEdit || editForm) && (
            <DropdownMenuItem onClick={() => {
              if (onEdit) onEdit();
              else setShowEditDialog(true);
            }}>
              <Edit className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
          )}
          {onDuplicate && (
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="size-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
          )}
          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      {editForm && (
        <EditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          title={`Edit ${itemType}`}
        >
          {editForm}
        </EditDialog>
      )}

      {/* Delete Confirmation */}
      {onDelete && (
        <DeleteConfirmation
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
          title={`Delete ${itemType}?`}
          description={`Are you sure you want to delete this ${itemType.toLowerCase()}?`}
          itemName={item.name || item.id}
        />
      )}
    </>
  );
}
