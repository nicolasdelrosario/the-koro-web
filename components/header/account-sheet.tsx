"use client";

import { useState } from "react";
import { SignInForm } from "@/app/(routes)/auth/components/sign-in-form";
import { UserView } from "@/app/(routes)/auth/components/user-view";
import UserIcon from "@/components/icons/user-icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/lib/hooks/use-user";

export default function AccountSheet() {
  const { data: user, isLoading, isError } = useUser();
  const [open, setOpen] = useState(false);

  const isAuthenticated = !!user && !isError && user !== null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="User">
          <UserIcon width={18} height={18} />
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[480px] px-10 py-12 space-y-8">
        <SheetHeader>
          <SheetTitle className="text-xl sm:text-2xl font-cormorant tracking-[0.15em] font-medium">
            Account
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Access your account and manage your orders.
          </SheetDescription>
        </SheetHeader>

        {/* State handling */}
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}

        {!isLoading && isAuthenticated && user ? (
          <UserView user={user} />
        ) : (
          <SignInForm onSuccess={() => setOpen(false)} inSheet={true} />
        )}
      </SheetContent>
    </Sheet>
  );
}
