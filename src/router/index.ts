/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";

import Homepage from "@/pages/index.vue";
import NotFound from "../pages/NotFound.vue";
import Profile from "../pages/profile/index.vue";
import Contact from "../pages/contact/index.vue";
import Education from "../pages/education/index.vue";
import SignUp from "../pages/signup/index.vue";
import Login from "../pages/login/index.vue";
import { isAuthenticated } from "@/utils/isAuthenticated";

const additionalRoutes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)*", // Catch-all route for 404
    name: "NotFound",
    component: NotFound,
    meta: {
      breadCrumb: "NotFound",
    },
  },
  {
    path: "/",
    name: "home",
    component: Homepage,
    meta: {
      breadCrumb: "home",
    },
    children: [
      {
        path: "",
        name: "home",
        component: Homepage,
        meta: {
          breadCrumb: "home",
          parent: "home",
        },
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
        meta: {
          breadCrumb: "profile",
          parent: "home",
        },
      },
      {
        path: "contact",
        name: "contact",
        component: Contact,
        meta: {
          breadCrumb: "contact",
          parent: "home",
        },
      },
      {
        path: "education",
        name: "education",
        component: Education,
        meta: {
          breadCrumb: "education",
          parent: "home",
        },
      },
      {
        path: "signup",
        name: "signup",
        component: SignUp,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            // If the user is already logged in, redirect to the homepage
            next("/");
          } else {
            // Otherwise, allow access to the login page
            next();
          }
        },
        meta: {
          breadCrumb: "signup",
          parent: "home",
        },
      },
      {
        path: "login",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            // If the user is already logged in, redirect to the homepage
            next("/");
          } else {
            // Otherwise, allow access to the login page
            next();
          }
        },
        meta: {
          breadCrumb: "login",
          parent: "home",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes(routes) {
    const extendedRoutes = setupLayouts(routes);

    // Function to merge meta data into routes
    const mergeMetaIntoRoutes = (routes: any[], additionalRoutes: any[]) => {
      additionalRoutes.forEach((customRoute) => {
        const match = routes.find((route) => route.path === customRoute.path);

        if (match) {
          match.meta = { ...match.meta, ...customRoute.meta };
          if (match.children && customRoute.children) {
            mergeMetaIntoRoutes(match.children, customRoute.children);
          }
        } else {
          routes.push(customRoute);
        }
      });
    };

    // Merge additional routes into extended routes
    mergeMetaIntoRoutes(extendedRoutes, additionalRoutes);

    return extendedRoutes;
  },
});

export default router;
