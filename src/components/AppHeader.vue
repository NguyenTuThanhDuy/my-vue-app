<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
    prominent
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-app-bar-title data-testid="test-toolbar-title"
      >My Profile</v-app-bar-title
    >

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        dense
        router
        :to="item.route"
        class="list-item"
        :append-icon="item.icon"
        v-bind:title="item.title"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const isLogin = ref(false);
const drawer = ref(false);
const items = [
  {
    icon: "mdi-home",
    title: "Home",
    value: "home",
    route: "/",
  },
  {
    icon: "mdi-account",
    title: "About Me",
    value: "aboutme",
    route: "/profile",
  },
  {
    icon: "mdi-contacts",
    title: "Contact",
    value: "contact",
    route: "/contact",
  },
  {
    icon: "mdi-gift",
    title: "Donate",
    value: "donate",
    route: "/donate",
  },
];
</script>

<style scoped lang="scss"></style>
