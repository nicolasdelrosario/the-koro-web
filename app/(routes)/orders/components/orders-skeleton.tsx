"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
