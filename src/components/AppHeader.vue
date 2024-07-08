<template>
  <v-container>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>My Profile</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        flat
        hint="Enter your query"
        clearable
        :loading="loading"
        @click:append-inner="submitSearchQuery"
        @keydown.enter="submitSearchQuery"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-avatar v-if="isLogin">
        <v-img
          src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
        ></v-img>
      </v-avatar>
      <v-btn variant="text" @click="toggleLogin" v-if="!isLogin">Login</v-btn>
      <v-btn variant="text" @click="toggleLogout" v-if="isLogin">Logout</v-btn>
      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>
  </v-container>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
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
import { ref, watch } from "vue";

const searchQuery = ref("");
const isLogin = ref(false);
const drawer = ref(false);
const group = ref(null);
const items = [
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
const loaded = ref(false);
const loading = ref(false);

watch(group, () => {
  drawer.value = false;
});

const submitSearchQuery = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
    console.log(searchQuery.value);
  }, 2000);
};

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};

const toggleLogout = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center; // Ensure items are centered vertically
  justify-content: center;

  v-icon {
    margin-right: 8px; // Adjust the spacing between icon and title
    font-size: 24px; // Adjust icon size if necessary
  }
}
</style>
