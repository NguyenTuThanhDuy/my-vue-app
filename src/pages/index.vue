<template>
  <Suspense>
    <template #default>
      <Homepage />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading.vue";
import { defineAsyncComponent } from "vue";
import NotFound from "./NotFound.vue";

// Lazy load the Homepage component
const Homepage = defineAsyncComponent({
  loader: () => import("@/components/Homepage.vue"),
  loadingComponent: Loading,
  delay: 5000,
  errorComponent: NotFound,
  timeout: 10000,
});
</script>

<style scoped lang="scss"></style>
