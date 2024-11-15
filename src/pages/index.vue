<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="video in data" :key="video.id" cols="12" md="4" lg="3">
        <VideoGridItem :video="video" />
      </v-col>
      <v-col v-if="!loading && data.length === 0" cols="12">
        <v-alert type="info"> No videos available. </v-alert>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="my-4"
      ></v-progress-circular>

      <v-pagination
        v-else
        dense
        v-model="currentPage"
        :length="totalPages"
        @input="fetchData"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        active-color="red"
        :total-visible="5"
      ></v-pagination>
      <v-select
        dense
        :items="pageSizeOptions"
        v-model="itemCount"
        label="Items per page"
        @change="onPageSizeChange"
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

const data = ref([] as Video[]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemCount = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const errorMessage = ref("");
const pageSizeOptions = [5, 10, 25, 50];

onMounted(async () => {
  await fetchData(currentPage.value);
});

const fetchData = async (page = 1) => {
  loading.value = true;
  errorMessage.value = "";
  const routes = useRoutes();
  const URL = routes.URLs.VIDEO_URL({
    limit: itemCount.value,
    offset: itemCount.value * (page - 1),
  });

  try {
    const response = await axiosInstance.get(URL);
    data.value = response.data.videos;
    totalItems.value = response.data.total;
    totalPages.value = Math.ceil(totalItems.value / itemCount.value);

    // Adjust current page if it exceeds total pages
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    errorMessage.value = "Failed to load videos. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const onPageSizeChange = () => {
  currentPage.value = 1; // Reset to the first page when page size changes
  fetchData(currentPage.value);
};

watch([currentPage, itemCount], () => fetchData(currentPage.value));
</script>

<style scoped lang="scss">
/* Add padding to the row for better alignment */
.mt-4 {
  margin-top: 1.5rem;
}

/* Add responsive styling for pagination and select */
.v-pagination,
.v-select {
  margin: 0 10px;
}
</style>
