<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";

onMounted(() => {
  const authStore = useAuthStore();
  const user = sessionStorage.getItem("access_token");

  if (user) {
    authStore.setUserInfo(JSON.parse(user));
  }
});
</script>
