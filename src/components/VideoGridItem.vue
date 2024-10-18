<template>
  <v-card class="d-flex flex-column gap-2 rounded-lg" outlined>
    <!-- Hover to play the video -->
    <v-hover v-model:model-value="isVideoPlaying">
      <v-card-text>
        <!-- Thumbnail Image -->
        <v-img
          :src="video.thumbnailUrl"
          aspect-ratio="16/9"
          :class="isVideoPlaying ? '' : 'rounded-xl'"
          alt="Video thumbnail"
        ></v-img>

        <!-- Video that plays on hover -->
        <v-overlay :value="isVideoPlaying" absolute>
          <video
            ref="videoRef"
            :src="video.videoUrl"
            muted
            playsinline
            class="w-100 h-100"
          ></video>
        </v-overlay>

        <!-- Video duration -->
        <v-chip class="position-absolute bottom-1 right-1" small>
          {{ formatDuration(video.duration) }}
        </v-chip>
      </v-card-text>
    </v-hover>

    <!-- Video Details -->
    <v-card-text class="d-flex gap-2">
      <v-avatar>
        <v-img :src="video.channel.profileUrl" alt="Channel avatar"></v-img>
      </v-avatar>
      <div class="d-flex flex-column">
        <!-- Video Title -->
        <v-btn :to="`/watch?v=${video.id}`">{{ video.title }}</v-btn>
        <!-- Channel Name -->
        <v-btn small :to="`/@${video.channel.id}`">{{
          video.channel.name
        }}</v-btn>
        <!-- Views and Posted Time -->
        <span class="text-secondary">
          {{ formattedViews }} Views • {{ formatTimeAgo(video.postedAt) }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { formatDuration } from "@/utils/formatDuration";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import type Video from "@/types/video.type";

// Props (Typed as Video)
const props = defineProps<{ video: Video }>();

// State for video reference and hover status
const videoRef = ref<HTMLVideoElement | null>(null);

// Formatter for views
const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

// Computed value for formatted views
const formattedViews = VIEW_FORMATTER.format(props.video.views);

let isVideoPlaying: boolean = false;

// Function to handle video playback
function handleVideoPlayback() {
  if (videoRef.value) {
    if (isVideoPlaying) {
      videoRef.value.currentTime = 0; // Reset video to start on hover
      videoRef.value.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    } else {
      videoRef.value.pause();
    }
  }
}

// Watch for hover state changes using Vuetify's `v-hover`
watch(
  () => videoRef.value,
  (newVal) => {
    if (newVal) {
      handleVideoPlayback(); // Ensure video is paused initially
    }
  }
);

onMounted(() => {
  handleVideoPlayback(); // Pause the video when mounted
});

// Optional: Pause the video when the component is destroyed
onBeforeUnmount(() => {
  handleVideoPlayback();
});
</script>

<style scoped>
.position-absolute {
  position: absolute;
}

.bottom-1 {
  bottom: 0.25rem;
}

.right-1 {
  right: 0.25rem;
}

.rounded-xl {
  border-radius: 1rem;
}
</style>
