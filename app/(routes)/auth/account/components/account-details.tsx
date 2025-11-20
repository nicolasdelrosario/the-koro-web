import Link from "next/link";
import type { User } from "@/lib/schemas/auth/user-schema";

type Props = {
  user: Partial<User>;
};

export default function AccountDetails({ user }: Props) {
  return (
    <div className="space-y-8">
      {/* header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-cormorant tracking-[0.15em] font-medium">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* personal information */}
      <div className="space-y-6 border-t border-border pt-8">
        <h3 className="text-sm uppercase tracking-wide text-muted-foreground">
          Personal Information
        </h3>

        <div className="grid gap-6">
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm">{user.name || "Not provided"}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
      </div>

      {/* account stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-border pt-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total Orders
          </p>
          <p className="text-2xl font-cormorant">0</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Wishlist Items
          </p>
          <p className="text-2xl font-cormorant">0</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Member Since
          </p>
          <p className="text-2xl font-cormorant">2025</p>
        </div>
      </div>
    </div>
  );
}
