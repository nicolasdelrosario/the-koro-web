import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  showAction?: boolean;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  title = "No products found",
  description = "There are no results for your search. Try adjusting your filters or browse our collections.",
  showAction = true,
  actionLabel = "View All Products",
  actionHref = "/products",
}: Props) {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-3xl text-center space-y-12">
        {/* title */}
        <div className="space-y-12">
          <h1 className="text-2xl sm:text-3xl font-cormorant tracking-[0.15em] font-medium capitalize">
            {title}
          </h1>
          <div className="w-full h-px bg-muted-foreground" />
        </div>

        {/* description */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        {showAction && (
          <Link href={actionHref}>
            <Button className="w-full max-w-md font-light px-12 py-6 uppercase tracking-widest">
              {actionLabel}
            </Button>
          </Link>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
