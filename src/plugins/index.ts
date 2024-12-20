/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";

import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import { queryClient } from "./vueQuery";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin, { queryClient })
    .use(PrimeVue, {
      theme: {
        preset: Aura,
      },
    });
}
