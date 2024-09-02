/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";

import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

const queryClient = new QueryClient({
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
// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(VueQueryPlugin, { queryClient });
}
