"use client";
import { QueryClient } from "@tanstack/query-core";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: 60 * 1000 },
  },
});
