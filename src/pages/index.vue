<template>
  <v-container fluid class="ml-4 mr-4">
    <v-row>
      <v-col v-for="video in data" :key="video.id" cols="12" md="4" lg="3">
        <!-- Use a VideoCard component equivalent to the Svelte VideoGridItem -->
        <VideoGridItem :video="video" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-pagination
        dense
        v-model="currentPage"
        :length="totalPages"
        @input="fetchData"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        active-color="red"
        :total-visible="5"
      >
      </v-pagination>
      <v-select
        dense
        :items="pageSizeOptions"
        v-model="itemCount"
        label="Items per page"
        @change="fetchData(currentPage)"
        max-width="150px"
      ></v-select>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axiosInstance from "@/services/axios";
import useRoutes from "@/hooks/routes";
import Video from "@/types/video.type";
import VideoGridItem from "@/components/VideoGridItem.vue";

let data = ref([] as Video[]);
let currentPage = ref(1);
let totalPages = ref(5);
let itemCount = ref(10);
const totalItems = ref(0);
const pageSizeOptions = [5, 10, 25, 50];

onMounted(async () => {
  await fetchData(currentPage.value);
});

const fetchData = async (page = 1) => {
  const routes = useRoutes();
  const URL = routes.URLs.VIDEO_URL({
    limit: itemCount.value,
    offset: itemCount.value * (page - 1),
  });
  try {
    const response = await axiosInstance.get(URL);
    data.value = response.data.videos;
    totalItems.value = response.data.total;
    totalPages.value = Math.round(totalItems.value / itemCount.value);
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

watch([currentPage, itemCount], () => fetchData(currentPage.value));
</script>

<style scoped lang="scss">
/* You can add any scoped styles here */
</style>
