<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
    :elevation="2"
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

    <v-btn to="/profile">
      <v-app-bar-title data-testid="test-toolbar-title"
        >小白雪公主</v-app-bar-title
      >
    </v-btn>

    <v-spacer></v-spacer>

    <v-avatar>
      <v-img
        src="https://lh4.googleusercontent.com/proxy/iCw4ggSAAEb40kANm7DsrhgAQ4JNjw2vD4sSGfsPV9Pvf7Y004lIjgVRP_8iPpszRlqwWgNuZU7YCw1bMirflc9jHjqdvxs1X3ivxwMI"
      ></v-img>
    </v-avatar>

    <v-btn icon @click="toggleTheme">
      <v-icon>{{
        isDarkTheme ? "mdi-brightness-7" : "mdi-brightness-4"
      }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-btn @click="() => router.push('login')" v-if="!isLogin">
      <v-icon>mdi-login</v-icon>
      <p>Login</p>
    </v-btn>

    <v-btn @click="() => router.push('signup')">
      <v-icon>mdi-account-plus</v-icon>
      <p>Sign Up</p>
    </v-btn>

    <v-btn @click="handleLogout" v-if="isLogin">
      <v-icon>mdi-logout</v-icon>
      <p>Logout</p>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
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
import { computed, ref } from "vue";
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { deleteCookie } from "@/utils/deleteCookie";

const router = useRouter();
const isLogin = ref(isAuthenticated());
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
  {
    icon: "mdi-video",
    title: "Video",
    value: "video",
    route: "/video",
  },
];

const handleLogout = () => {
  deleteCookie("access_token");
  sessionStorage.removeItem("userInfo");
  isLogin.value = false;
};
const theme = useTheme();
const isDarkTheme = computed(() => theme.global.current.value.dark);

const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? "light" : "dark";
};
</script>

<style scoped lang="scss"></style>
