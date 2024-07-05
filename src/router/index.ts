/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";

import NotFound from "../pages/NotFound.vue";

const additionalRoutes = [
  {
    path: "/:catchAll(.*)*", // Catch-all route for 404
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes(routes) {
    const extendedRoutes = setupLayouts(routes);
    return [...extendedRoutes, ...additionalRoutes];
  },
});

export default router;
