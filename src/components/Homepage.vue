<template>
  <v-sheet class="flex-container" v-if="!isLoading && !isError">
    <v-sheet class="stepper-container" elevation="2">
      <v-stepper v-model="step" vertical class="stepper">
        <v-stepper-header class="stepper-container">
          <v-stepper-item
            v-for="(item, index) in items"
            :key="item.id"
            :step="index + 1"
            :color="step == index + 1 ? 'primary' : undefined"
            :value="index + 1"
            @click="scrollToSection(item.id)"
            editable
          >
            <template #default>
              <v-card-title>{{ item.title }}</v-card-title>
            </template>
          </v-stepper-item>
        </v-stepper-header>
      </v-stepper>
    </v-sheet>
    <v-sheet
      ref="scrollArea"
      @scroll="handleScroll"
      class="scroll-area"
      elevation="2"
      data-testid="test-scroll-area"
    >
      <v-sheet
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        class="scroll-section"
      >
        <v-card>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
          <v-btn
            prepend-icon="mdi-information"
            varient="outlined"
            @click="openModal(item.title)"
            >More Details</v-btn
          >
        </v-card>
      </v-sheet>
    </v-sheet>
  </v-sheet>
  <ModalComponent v-model="show">
    <Education :title="modalTitle" />
  </ModalComponent>

  <v-sheet v-if="isLoading">
    <Loading />
  </v-sheet>
  <v-sheet v-if="isError">
    <ForbiddenError :error="{ error }" />
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useQuery, keepPreviousData } from "@tanstack/vue-query";
// import axiosInstance from "@/hooks/axios";
// import { useAuthStore } from "@/stores/authStore";
import { Ref } from "vue";
import ForbiddenError from "./ForbiddenError.vue";
import Education from "@/modals/Education.vue";

interface Item {
  id: string;
  title: string;
  content: string;
}

const step: Ref<number> = ref(1);
const urlHash: Ref<string | null> = ref(null);
const scrollArea: Ref<any> = ref(null); // You might want to specify a more accurate type
const route = useRoute();
const router = useRouter();
const show: Ref<boolean> = ref(false);
const modalTitle: Ref<string> = ref("");
const isLoading: Ref<boolean> = ref(false);
const isError: Ref<boolean> = ref(false);
const error: Ref<string> = ref("Unknown Error");

const openModal = (title: string) => {
  show.value = true;
  modalTitle.value = title;
};
const handleScroll = () => {
  if (scrollArea.value?.$el) {
    const sections = scrollArea.value.$el.children;
    const scrollTop = scrollArea.value.$el.scrollTop;
    const sectionHeight = sections[0].offsetHeight;
    const newStep = Math.min(
      Math.floor(scrollTop / sectionHeight) + 1,
      sections.length
    );
    urlHash.value = items[newStep - 1].id;
    step.value = newStep;
  }
};

const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    urlHash.value = sectionId;
  }
};

const items: Item[] = [
  { id: "summary", title: "Summary", content: "Content 1" },
  { id: "experience", title: "Experiences", content: "Content 2" },
  { id: "education", title: "Education", content: "Content 3" },
  { id: "archivement", title: "Archivements", content: "Content 4" },
  { id: "skill", title: "Skills", content: "Content 5" },
  { id: "hobby", title: "Hobbies", content: "Content 6" },
];

// Watch step changes to update URL hash
watch(urlHash, (newStep) => {
  router.replace({ hash: `#${newStep}` });
});

// Scroll to the section based on URL hash on initial load
onMounted(() => {
  if (route.hash) {
    const section = document.querySelector(route.hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
});
</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  width: 100%;
}

.stepper-container {
  display: flex;
  flex-direction: column;
  height: 810px;
}

.stepper {
  flex: 1 1 auto;
}

.scroll-area {
  flex: 1;
  max-height: 810px;
  height: 810px;
  overflow-y: auto;
}

.scroll-section {
  height: 810px;
  max-height: 810px;
}
</style>
