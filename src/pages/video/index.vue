<template>
  <v-container fluid class="ml-4 mr-4">
    <v-row>
      <v-col v-for="video in data" :key="video.id" cols="12" md="4" lg="3">
        <!-- Use a VideoCard component equivalent to the Svelte VideoGridItem -->
        <VideoGridItem :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axiosInstance from "@/services/axios";
import useRoutes from "@/hooks/routes";
import Video from "@/types/video.type";
import VideoGridItem from "@/components/VideoGridItem.vue";

export default {
  data() {
    return {
      data: [] as Video[], // State for storing the video data
    };
  },
  components: {
    VideoGridItem,
  },
  async mounted() {
    const routes = useRoutes();
    const URL = routes.URLs.VIDEO_URL({ limit: 10, offset: 0 });

    try {
      const response = await axiosInstance.get(URL);
      this.data = response.data.videos;
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  },
};
</script>

<style scoped lang="scss">
/* You can add any scoped styles here */
</style>
