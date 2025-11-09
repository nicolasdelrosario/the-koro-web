import MaxWidthWrapper from "@/app/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

type LoadingSkeletonProps = {
  variant?: "product" | "list";
};

export default function LoadingSkeleton({
  variant = "product",
}: LoadingSkeletonProps) {
  if (variant === "list") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
        {Array.from({ length: 8 }).map(() => (
          <div
            key={`skeleton-${crypto.randomUUID()}`}
            className="flex flex-col gap-2"
          >
            <Skeleton className="w-full aspect-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="md:h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 p-6 md:p-8">
      {/* image skeleton */}
      <Skeleton className="relative w-full aspect-3/4 md:h-[calc(100vh-124px)] md:aspect-auto overflow-hidden" />

      {/* info skeleton */}
      <div className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-12 border-t md:border-t-0 md:border-l border-border space-y-8 md:overflow-y-auto">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>

        <div className="pt-8 flex gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
