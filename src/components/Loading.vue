<template>
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

<script lang="ts" setup>
import { VContainer, VRow, VCol, VProgressCircular } from "vuetify/components";
</script>
