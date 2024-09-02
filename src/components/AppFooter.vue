<template>
  <v-bottom-navigation
    v-model="value"
    background-color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
    class="custom-bottom-navigation"
  >
    <v-btn
      v-for="(socialLink, index) in socialLinks"
      :key="socialLink.label"
      @click="changeValue(index, socialLink.link)"
    >
      <v-icon>{{ socialLink.icon }}</v-icon>

      <span>{{ socialLink.label }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const socialLinks = [
  {
    label: "YouTube",
    icon: "mdi-youtube",
    link: "https://www.youtube.com",
  },
  {
    label: "Instagram",
    icon: "mdi-instagram",
    link: "https://www.instagram.com",
  },
  {
    label: "Facebook",
    icon: "mdi-facebook",
    link: "https://www.facebook.com",
  },
  {
    label: "Discord",
    icon: "mdi-discord",
    link: "https://www.discord.com",
  },
];
const value = ref(1);
const changeValue = (index: number, link: string) => {
  value.value = index;
  window.open(link, "_blank");
};

const color = computed(() => {
  switch (value.value) {
    case 0:
      return "blue-grey";
    case 1:
      return "teal";
    case 2:
      return "brown";
    case 3:
      return "indigo";
    default:
      return "blue-grey";
  }
});
</script>

<style scoped>
.flex-nowrap {
  flex-wrap: nowrap;
}

.align-center {
  justify-content: center;
}
.custom-bottom-navigation {
  position: relative;
  background-image: linear-gradient(
    to top right,
    rgba(19, 84, 122, 0.8),
    rgba(128, 208, 199, 0.8)
  );
}
</style>
