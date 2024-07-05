<template>
  <Suspense>
    <template #default>
      <HelloWorld />
    </template>
    <template #fallback>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            <div>Loading...</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { VContainer, VRow, VCol, VProgressCircular } from "vuetify/components";

// Lazy load the HelloWorld component
const HelloWorld = defineAsyncComponent(
  () => import("../components/HelloWorld.vue")
);
</script>

<style scoped>
/* Add your styles here */
</style>
