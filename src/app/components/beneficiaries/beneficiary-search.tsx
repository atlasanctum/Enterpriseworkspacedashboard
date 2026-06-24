'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Upload, Download, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function BeneficiarySearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleCountryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('country', value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('status', value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <Card className="flex-1">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                className="pl-10"
              />
            </div>
            <Select
              defaultValue={searchParams.get('country')?.toString() || 'all'}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="w-[200px]">
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
            <Select
              defaultValue={searchParams.get('status')?.toString() || 'all'}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending-verification">Pending Verification</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button variant="outline">
          <Upload className="size-4 mr-2" />
          Import
        </Button>
        <Button variant="outline">
          <Download className="size-4 mr-2" />
          Export
        </Button>
        <Button>
          <Plus className="size-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
}
