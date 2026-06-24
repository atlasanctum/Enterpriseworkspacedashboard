import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto size-16 rounded-lg bg-muted flex items-center justify-center mb-4">
            <FileQuestion className="size-8 text-muted-foreground" />
          </div>
          <CardTitle>404 - Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Return to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/beneficiaries">View Beneficiaries</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
