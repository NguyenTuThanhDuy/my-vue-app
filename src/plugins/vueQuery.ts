import { QueryClient } from "@tanstack/vue-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300, // 1 minute stale time
      refetchOnWindowFocus: false, // Refetches on window focus by default
      refetchOnReconnect: true, // Refetches on reconnect by default
      retry: 3, // Number of retry attempts on failure
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff for retries
    },
  },
});
