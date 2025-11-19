"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  showBackButton?: boolean;
};

export default function NotFound({
  title = "Page not available",
  description = "There are no results for your search, do not hesitate to contact our customer service by email or by phone.",
  showBackButton = true,
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

        {/* contact info */}
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Need help? Contact us
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Monday to Friday from 10:00am to 1:00pm and from 2:00 to 9:00pm CET
            <br />
            Saturdays from 10:00am to 1:00pm and from 2:00pm to 6:00 CET
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link
              href="tel:+51913621524"
              className="underline hover:text-muted-foreground transition-colors"
            >
              Call
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              href="mailto:delrosariolozanonicolas@gmail.com"
              className="underline hover:text-muted-foreground transition-colors"
            >
              Email
            </Link>
          </div>
        </div>

        {/* call to action button */}
        <div className="pt-8">
          {showBackButton ? (
            <Button
              onClick={() => window.history.back()}
              className="w-full max-w-md font-light px-12 py-6 uppercase tracking-widest"
            >
              Go Back
            </Button>
          ) : (
            <Link href="/">
              <Button className="w-full max-w-md font-light px-12 py-6 uppercase tracking-widest">
                Back to Homepage
              </Button>
            </Link>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
