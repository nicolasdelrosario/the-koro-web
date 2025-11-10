"use client";

import Link from "next/link";
import { useState } from "react";
import MaxWidthWrapper from "@/app/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/hooks/use-categories";
import AccountSheet from "../account/account-sheet";
import HeartIcon from "../icons/heart-icon";
import MenuIcon from "../icons/menu-icon";
import SearchIcon from "../icons/search-icon";

export default function Header() {
  const { data: categories } = useCategories();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/70 backdrop-blur-md border-b border-border z-50">
      <MaxWidthWrapper className="flex items-center justify-between py-4">
        {/* Left nav (desktop only) */}
        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wide">
          <Link
            href="/products"
            className="hover:text-muted-foreground transition-colors"
          >
            Shop
          </Link>
          {categories?.map((category) => (
            <Link
              key={category.id ?? category.title}
              href={`/categories/${category.id}`}
              className="hover:text-muted-foreground transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </nav>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl sm:text-3xl font-cormorant tracking-[0.15em] font-medium"
        >
          The Koro.
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-5 md:gap-6 ml-auto">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Search"
            className="hover:text-muted-foreground transition-colors"
          >
            <SearchIcon width={18} height={18} />
          </Button>

          <AccountSheet />

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Wishlist"
            className="hover:text-muted-foreground transition-colors"
          >
            <HeartIcon width={18} height={18} />
          </Button>

          <Link
            href="/cart"
            className="hidden sm:inline-block hover:text-muted-foreground font-light transition-colors text-sm tracking-wide"
          >
            Cart (0)
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen(!open)}
            className="md:hidden ml-2"
            aria-label="Toggle menu"
          >
            <MenuIcon width={20} height={20} />
          </Button>
        </div>
      </MaxWidthWrapper>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-background border-t border-border animate-fade-in">
          <Link href="/products" onClick={() => setOpen(false)}>
            Shop
          </Link>
          {categories?.map((category) => (
            <Link
              key={category.id ?? category.title}
              href={`/categories/${category.id}`}
              onClick={() => setOpen(false)}
              className="hover:text-muted-foreground transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
