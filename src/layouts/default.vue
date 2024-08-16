<template>
  <v-app>
    <AppHeader />
    <Breadcrumb />
    <v-main max-height="800px">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
<style scoped></style>
