<template>
  <v-card class="rounded-lg" outlined :to="video.videoUrl">
    <!-- Thumbnail Image with Tooltip -->
    <v-hover v-model="isPlaying">
      <template v-slot:default="{ isHovering, props }">
        <v-card v-bind="props">
          <!-- Tooltip -->

          <!-- Thumbnail or Video -->
          <div class="media-container">
            <v-tooltip
              :text="video.title"
              :disabled="!isPlaying"
              location="top"
              activator="parent"
            >
              <template v-slot:activator="{}">
                <!-- Video -->
                <video
                  ref="videoRef"
                  :src="video.videoUrl"
                  muted
                  playsinline
                  loop
                  class="w-100 h-100 rounded-xl"
                  :class="{ hidden: !isHovering }"
                  @mouseenter="playVideo"
                  @mouseleave="pauseVideo"
                  v-bind="props"
                ></video>

                <!-- Thumbnail -->
                <v-img
                  v-if="!isHovering"
                  v-bind="props"
                  :src="video.thumbnailUrl"
                  aspect-ratio="16/9"
                  alt="Video thumbnail"
                >
                  <v-chip
                    class="position-absolute bottom-1 right-1"
                    :style="{ color: chipTextColor }"
                    small
                  >
                    {{ formatDuration(video.duration) }}
                  </v-chip>
                </v-img>
              </template>
            </v-tooltip>
          </div>
        </v-card>
      </template>
    </v-hover>

    <!-- Video Details -->
    <v-card class="d-flex gap-2 align-center">
      <router-link
        :to="`/@${video.channel.id}`"
        style="text-decoration: none; display: inline-flex"
        class="avatar-hover"
      >
        <v-avatar>
          <v-img :src="video.channel.profileUrl" alt="Channel avatar"></v-img>
        </v-avatar>
      </router-link>
      <v-card class="d-flex flex-column" width="100%">
        <span class="text-truncate" style="text-align: left">
          {{ video.title }}
        </span>
        <router-link
          :to="`/@${video.channel.id}`"
          style="text-decoration: none; color: inherit"
          class="channel-hover"
        >
          {{ video.channel.id }}
        </router-link>
        <span>
          {{ formattedViews }} Views • {{ formatTimeAgo(video.postedAt) }}
        </span>
      </v-card>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

import "vidstack/bundle";

import { formatDuration } from "@/utils/formatDuration";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import type Video from "@/types/video.type";

// Props (Typed as Video)
const props = defineProps<{ video: Video }>();

// Reference to the video element
const videoRef = ref<HTMLVideoElement>();

const isPlaying = ref(false);

// Formatter for views
const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

// Computed value for formatted views
const formattedViews = VIEW_FORMATTER.format(props.video.views);

// State for chip text color
const chipTextColor = ref("white");

const playVideo = () => {
  if (videoRef.value) {
    videoRef.value
      .play()
      .catch((err) => console.error("Error playing video: ", err));
  }
};

const pauseVideo = () => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
};
</script>

<style scoped lang="scss">
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

.avatar-hover {
  display: inline-block;
  transition: transform 0.3s ease;
}

.avatar-hover:hover {
  transform: scale(1.2);
}

.channel-hover {
  font-weight: normal;
  transition: font-weight 0.3s ease;
}

.channel-hover:hover {
  font-weight: bold;
}
.media-container {
  position: relative;
  width: 100%;
  height: auto;
}

.hidden {
  display: none;
}
</style>
