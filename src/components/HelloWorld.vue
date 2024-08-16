<template>
  <v-sheet class="flex-container">
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
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const userInfo = authStore.getUserInfo();
authStore.setUserInfo({
  id: "123abc",
  name: "Duy",
  token: "123456789",
});

const step = ref(1);
const urlHash = ref(null);
const scrollArea = ref(null);
const route = useRoute();
const router = useRouter();

const handleScroll = () => {
  const sections = scrollArea.value.$el.children;
  const scrollTop = scrollArea.value.$el.scrollTop;
  const sectionHeight = sections[0].offsetHeight;
  const newStep = Math.min(
    Math.floor(scrollTop / sectionHeight) + 1,
    sections.length
  );
  urlHash.value = items[newStep - 1].id;
  step.value = newStep;
};

const scrollToSection = (sectionId) => {
  const section = document.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    urlHash.value = sectionId;
  }
};

const items = [
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
  margin-right: 20px;
  height: 800px;
}

.stepper {
  flex: 1 1 auto;
}

.scroll-area {
  flex: 1;
  max-height: 800px;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.scroll-section {
  height: 800px;
  border-bottom: 1px solid #ddd;
  max-height: 800px;
}
</style>
