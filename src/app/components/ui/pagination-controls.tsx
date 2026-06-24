'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { generatePagination } from '@/lib/utils/pagination';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex gap-1">
        {allPages.map((page, index) => {
          if (page === '...') {
            return (
              <div key={index} className="flex items-center px-3">
                ...
              </div>
            );
          }

          return (
            <Button
              key={index}
              asChild
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
            >
              <Link href={createPageURL(page)}>{page}</Link>
            </Button>
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const icon = direction === 'left' ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />;

  return isDisabled ? (
    <Button variant="outline" size="sm" disabled>
      {icon}
    </Button>
  ) : (
    <Button variant="outline" size="sm" asChild>
      <Link href={href}>{icon}</Link>
    </Button>
  );
}
