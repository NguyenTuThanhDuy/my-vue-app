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
import { defineAsyncComponent } from "vue";

// Lazy load the HelloWorld component
const Homepage = defineAsyncComponent(
  () => import("../components/HelloWorld.vue")
);
</script>

<style scoped lang="scss"></style>
