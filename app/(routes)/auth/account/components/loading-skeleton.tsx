import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <MaxWidthWrapper className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        {/* sidebar */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-px w-12" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-px w-full" />

          <Skeleton className="h-4 w-20" />
        </div>

        {/* main content */}
        <div className="space-y-12">
          {/* header */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>

          {/* personal info */}
          <div className="space-y-6 border-t border-border pt-8">
            <Skeleton className="h-4 w-40" />

            <div className="grid gap-6">
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-border pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-10" />
              </div>
            ))}
          </div>

          {/* edit form */}
          <div className="space-y-8 border-t border-border pt-12">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
