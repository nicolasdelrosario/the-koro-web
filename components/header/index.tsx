"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import AccountSheet from "@/components/header/account-sheet";
import CartSheet from "@/components/header/cart-sheet";
import WishlistSheet from "@/components/header/wishlist-sheet";
import MenuIcon from "@/components/icons/menu-icon";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/hooks/use-categories";
import { SearchInput } from "./search-input";

export default function Header() {
  const { data: categories } = useCategories();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/70 backdrop-blur-md border-b border-border z-50">
      <MaxWidthWrapper className="flex items-center justify-between py-4">
        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wide"
          aria-label="Primary navigation"
        >
          <Link
            href="/products"
            className="hover:text-muted-foreground transition-colors"
          >
            Shop
          </Link>
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="hover:text-muted-foreground transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </nav>

        {/* Logo (Centered) */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl sm:text-3xl font-cormorant tracking-[0.15em] font-medium"
          aria-label="The Koro - Home"
        >
          The Koro.
        </Link>

        {/* Actions (Right side) */}
        <div className="flex items-center gap-5 md:gap-6 ml-auto">
          <Suspense fallback={null}>
            <SearchInput />
          </Suspense>
          <AccountSheet />
          <WishlistSheet />
          <CartSheet />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleMobileMenu}
            className="md:hidden ml-2"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon width={20} height={20} />
          </Button>
        </div>
      </MaxWidthWrapper>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden flex flex-col items-center gap-6 py-6 bg-background border-t border-border animate-fade-in"
          aria-label="Mobile navigation"
        >
          <Link href="/products" onClick={closeMobileMenu}>
            Shop
          </Link>
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              onClick={closeMobileMenu}
              className="hover:text-muted-foreground transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
