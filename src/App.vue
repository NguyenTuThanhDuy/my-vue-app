<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { onMessage } from "firebase/messaging";

import { useAuthStore } from "@/stores/authStore";
import { messaging, fetchAndSaveToken } from "./plugins/firebase";

onMounted(() => {
  const authStore = useAuthStore();
  const user = sessionStorage.getItem("access_token");

  if (user) {
    authStore.setUserInfo(JSON.parse(user));
  }

  onMessage(messaging, (payload: any) => {
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
      body: payload?.notification?.body,
      icon: "/icon.png",
    };

    // Display the notification using the Notification API
    console.log(Notification.permission);
    if (Notification.permission === "granted") {
      new Notification(notificationTitle, notificationOptions);
    }
  });
});

const requestPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await fetchAndSaveToken();
    if (token) {
      localStorage.setItem("notification", token);
    }
  } catch (error) {
    console.error("Error getting permission or token", error);
  }
};

requestPermission();
</script>
