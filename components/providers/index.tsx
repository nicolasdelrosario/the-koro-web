"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import QueryClientWrapper from "@/components/providers/query-client-wrapper";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientWrapper>
      {children}
      <Toaster position="top-center" />
    </QueryClientWrapper>
  );
}
