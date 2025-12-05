'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Download, Plus, Filter } from 'lucide-react';
import { EditDialog } from '@/components/dialogs/edit-dialog';

interface CRUDDataTableProps {
  title: string;
  description: string;
  createButtonText?: string;
  createForm?: React.ReactNode;
  onExport?: () => void;
  onImport?: () => void;
  children: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export function CRUDDataTable({
  title,
  description,
  createButtonText = 'Create New',
  createForm,
  onExport,
  onImport,
  children,
  searchPlaceholder = 'Search...',
  onSearch,
}: CRUDDataTableProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {onImport && (
            <Button variant="outline" onClick={onImport}>
              Import
            </Button>
          )}
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <Download className="size-4 mr-2" />
              Export
            </Button>
          )}
          {createForm && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="size-4 mr-2" />
              {createButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      {createForm && (
        <EditDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          title={`Create ${title}`}
        >
          {createForm}
        </EditDialog>
      )}
    </div>
  );
}
