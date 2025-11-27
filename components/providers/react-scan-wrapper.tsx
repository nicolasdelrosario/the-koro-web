"use client";

import { type ReactNode, useEffect } from "react";
import { scan } from "react-scan";
import { env } from "@/config/env";

export default function ReactScanWrapper({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    if (env.NODE_ENV === "development") {
      scan({ enabled: true });
    }
  }, []);

  return <>{children}</>;
}
