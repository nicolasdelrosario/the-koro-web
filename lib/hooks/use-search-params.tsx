import {
  useSearchParams as useNextSearchParams,
  useRouter,
} from "next/navigation";
import { useCallback } from "react";

export function useSearchParamsManager() {
  const router = useRouter();
  const searchParams = useNextSearchParams();

  const setParam = useCallback(
    (key: string, value?: string | number | boolean) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      if (value == null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const getParam = useCallback(
    (key: string, defaultValue?: string): string | undefined => {
      return searchParams.get(key) ?? defaultValue;
    },
    [searchParams],
  );

  const deleteParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete(key);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const setMultipleParams = useCallback(
    (updates: Record<string, string | number | boolean | undefined>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(updates).forEach(([key, value]) => {
        if (value == null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return {
    setParam,
    getParam,
    deleteParam,
    setMultipleParams,
    searchParams,
  };
}
