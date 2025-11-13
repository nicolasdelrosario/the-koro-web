"use client";

import { useState } from "react";
import { ProfileView } from "@/app/(routes)/auth/components/profile-view";
import { SignInForm } from "@/app/(routes)/auth/components/sign-in-form";
import UserIcon from "@/app/components/icons/user-icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProfile } from "@/lib/hooks/use-profile";

export default function AccountSheet() {
  const { data: profile, isLoading, isError } = useProfile();
  const [open, setOpen] = useState(false);

  const isAuthenticated = !!profile && !isError && profile !== null;

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

        {!isLoading && isAuthenticated && profile ? (
          <ProfileView profile={profile} />
        ) : (
          <SignInForm onSuccess={() => setOpen(false)} inSheet={true} />
        )}
      </SheetContent>
    </Sheet>
  );
}
