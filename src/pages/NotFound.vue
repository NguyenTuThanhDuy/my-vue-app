<template>
  <v-container class="text-center">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<style scoped></style>
