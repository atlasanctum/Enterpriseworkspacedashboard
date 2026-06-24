/**
 * Responsive Wrapper Component
 * 
 * Use this wrapper to make any content responsive with consistent spacing
 */

import { ReactNode } from 'react';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveWrapper({ children, className = '' }: ResponsiveWrapperProps) {
  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Responsive Header Component
 * 
 * Standard header with title and optional actions
 */
interface ResponsiveHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function ResponsiveHeader({ title, description, actions }: ResponsiveHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2>{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * Responsive Grid Component
 * 
 * Automatically responsive grid for cards
 */
interface ResponsiveGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}

export function ResponsiveGrid({ children, cols = 4, className = '' }: ResponsiveGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[cols]} gap-3 md:gap-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Responsive Stat Card Component
 * 
 * Pre-built responsive stat card
 */
import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface ResponsiveStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export function ResponsiveStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
}: ResponsiveStatCardProps) {
  return (
    <Card>
      <CardContent className="pt-4 md:pt-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
            <p className="text-xl md:text-2xl mt-1">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`size-10 sm:size-12 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`size-5 sm:size-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Responsive Table Wrapper
 * 
 * Makes tables scrollable on mobile
 */
interface ResponsiveTableWrapperProps {
  children: ReactNode;
}

export function ResponsiveTableWrapper({ children }: ResponsiveTableWrapperProps) {
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      {children}
    </div>
  );
}
