<template>
  <div>
    <v-container>
      <v-stepper v-model="step" non-linear>
        <v-stepper-header>
          <v-stepper-item
            v-for="n in 4"
            :key="n"
            :complete="step > n"
            :step="n"
            :color="step > n ? 'primary' : undefined"
            :value="n"
            @click="scrollToSection(n)"
            editable
          >
            <v-card-title v-if="step == n">Step {{ n }}</v-card-title>
          </v-stepper-item>
          <v-divider v-for="n in 3" :key="`divider-${n}`"></v-divider>
        </v-stepper-header>
      </v-stepper>
      <div ref="scrollArea" @scroll="handleScroll" class="scroll-area">
        <div
          v-for="i in 4"
          :key="i"
          :id="`section-${i}`"
          class="scroll-section"
        >
          <v-card>
            <v-card-title>Section {{ i }}</v-card-title>
            <v-card-text>Some content for section {{ i }}...</v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const step = ref(1);
const scrollArea = ref(null);
const route = useRoute();
const router = useRouter();

const handleScroll = () => {
  const sections = scrollArea.value.children;
  const scrollTop = scrollArea.value.scrollTop;
  const sectionHeight = sections[0].offsetHeight;
  const newStep = Math.min(
    Math.floor(scrollTop / sectionHeight) + 1,
    sections.length
  );
  step.value = newStep;
};

const scrollToSection = (sectionNumber) => {
  const section = document.querySelector(`#section-${sectionNumber}`);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    step.value = sectionNumber;
  }
};

// Watch step changes to update URL hash
watch(step, (newStep) => {
  const sectionId = `section-${newStep}`;
  router.replace({ hash: `#${sectionId}` });
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
.scroll-area {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

.scroll-section {
  height: 600px;
  border-bottom: 1px solid #ddd;
  padding: 20px;
}
</style>
