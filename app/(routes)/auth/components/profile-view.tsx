"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useLogout } from "@/lib/hooks/use-logout";
import type { Profile } from "@/lib/schemas/profile-schema";

export function ProfileView({ profile }: { profile: Profile }) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="space-y-10 sm:p-4">
      {/* Last order */}
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Last order
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          You have no order history
        </p>
      </div>

      <hr className="border-border" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wide">
            Information
          </h3>
          <SheetClose asChild>
            <Button
              variant="link"
              className="h-auto p-0 text-sm font-normal underline-offset-4"
              asChild
            >
              <Link href="/account/edit">Edit my information</Link>
            </Button>
          </SheetClose>
        </div>

        {/* Personal details */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Personal details
          </p>

          <div className="text-sm text-muted-foreground">
            <p>{profile.name}</p>
            <p>{profile.email}</p>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Password</p>
          <p className="text-sm text-muted-foreground tracking-widest">
            ********
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* View my account */}
        <SheetClose asChild>
          <Button className="w-full mt-10 font-light tracking-wide" asChild>
            <Link href="/account">VIEW MY ACCOUNT</Link>
          </Button>
        </SheetClose>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full font-light tracking-wide"
          onClick={() => logout()}
          disabled={isPending}
        >
          {isPending ? "LOGGING OUT..." : "LOGOUT"}
        </Button>
      </div>
    </div>
  );
}
