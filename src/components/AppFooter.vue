<template></template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const router = useRouter();

    const subscribeFunc = () => {
      window.alert("Thanks for your subscribe");
    };

    const socialLinks = [
      { label: "YouTube", icon: "mdi-youtube", link: "/youtube" },
      { label: "Instagram", icon: "mdi-instagram", link: "/instagram" },
      { label: "Twitter", icon: "mdi-twitter", link: "/twitter" },
      { label: "Facebook", icon: "mdi-facebook", link: "/facebook" },
    ];

    const links = [
      [
        { label: "Company", key: "header-1" },
        { label: "About us", key: "item-1-1", link: "/about" },
        { label: "Contact us", key: "item-1-3", link: "/contact" },
      ],
      [
        { label: "Support", key: "header-2" },
        { label: "Help center", key: "item-2-1", link: "/help" },
        { label: "Terms of service", key: "item-2-2", link: "/termsofservice" },
        { label: "Legal", key: "item-2-3", link: "/legal" },
        { label: "Privacy policy", key: "item-2-4", link: "/policy" },
      ],
    ];

    return {
      email,
      subscribeFunc,
      socialLinks,
      links,
    };
  },
};
</script>

<style scoped></style>
