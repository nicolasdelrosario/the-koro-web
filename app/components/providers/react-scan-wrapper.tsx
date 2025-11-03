"use client";

import { type ReactNode, useEffect } from "react";
import { scan } from "react-scan";

export default function ReactScanWrapper({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <>{children}</>;
}
