"use client";

import AccountDetails from "@/app/(routes)/auth/account/components/account-details";
import AccountEditForm from "@/app/(routes)/auth/account/components/account-edit-form";
import AccountSidebar from "@/app/(routes)/auth/account/components/account-sidebar";
import LoadingSkeleton from "@/app/(routes)/auth/account/components/loading-skeleton";
import EmptyState from "@/components/empty-state/empty-state";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useUser } from "@/lib/hooks/use-user";

export default function Page() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!user) {
    return (
      <EmptyState
        title="You must be logged in"
        description="Please sign in to access your account."
        actionLabel="Go to Login"
        actionHref="/login"
      />
    );
  }

  return (
    <MaxWidthWrapper className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        <AccountSidebar />
        <div className="space-y-12">
          <AccountDetails user={user} />
          <div id="edit" className="border-t border-border pt-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-cormorant tracking-[0.15em] font-medium">
                  Edit Information
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Update your personal details
                </p>
              </div>
              <AccountEditForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
