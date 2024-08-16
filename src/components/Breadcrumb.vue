<template>
  <v-app-bar
    class="breadcrumb"
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
    prominent
    v-if="crumbs.length > 1"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>
    <v-breadcrumbs :items="crumbs">
      <template v-slot:divider>
        <v-icon icon="mdi-forward"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const crumbs = computed(() => {
  let pathArray = route.path.split("/");
  pathArray.shift();

  let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    breadcrumbArray.push({
      to: breadcrumbArray[idx - 1]
        ? "/" + breadcrumbArray[idx - 1].path + "/" + path
        : "/" + path,
      text: route.matched[idx].meta.breadCrumb || path,
      title: path.charAt(0).toUpperCase() + path.slice(1),
    });
    return breadcrumbArray;
  }, []);
  breadcrumbs = breadcrumbs.filter((e) => e.title.length !== 0);
  breadcrumbs.unshift({
    to: "/",
    text: "Home",
    title: "Home",
  });
  return breadcrumbs;
});
</script>

<style scoped>
/* Add your breadcrumb styling here */
</style>
