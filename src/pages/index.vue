<template>
  <Suspense>
    <template #default>
      <HelloWorld />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

// Lazy load the HelloWorld component
const HelloWorld = defineAsyncComponent(
  () => import("../components/HelloWorld.vue")
);
</script>

<style scoped lang="scss"></style>
