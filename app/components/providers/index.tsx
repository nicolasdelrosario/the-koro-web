"use client";

import type { ReactNode } from "react";
import QueryClientWrapper from "@/app/components/providers/query-client-wrapper";
import ReactScanWrapper from "@/app/components/providers/react-scan-wrapper";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactScanWrapper>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </ReactScanWrapper>
  );
}
