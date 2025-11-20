"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/lib/hooks/use-logout";

export default function AccountSidebar() {
  const { mutate: logout, isPending } = useLogout();
  const pathname = usePathname();

  const navItems = [
    { href: "/account", label: "Account Details" },
    { href: "/orders", label: "Order History" },
    { href: "/reviews", label: "Reviews" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  return (
    <aside className="lg:sticky lg:top-24 h-fit space-y-8">
      {/* title */}
      <div className="space-y-2">
        <h3 className="text-sm uppercase tracking-wide text-muted-foreground">
          My Account
        </h3>
        <div className="w-12 h-px bg-border" />
      </div>

      {/* navigation */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* divider */}
      <div className="w-full h-px bg-border" />

      {/* logout */}
      <button
        onClick={() => logout()}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
      >
        {isPending ? "Logging Out..." : "Logout"}
      </button>
    </aside>
  );
}
