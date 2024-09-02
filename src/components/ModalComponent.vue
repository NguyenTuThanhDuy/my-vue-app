<template>
  <transition name="fade">
    <div class="modal-backdrop" v-if="visible" @click.self="closeModal">
      <div class="modal" @click.stop>
        <slot></slot>
        <v-btn @click="closeModal">{{ closeTxt }}</v-btn>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: Boolean,
});
const closeTxt: Ref<string> = ref("Close");
const emit = defineEmits(["update:modelValue"]);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue;
  }
);

const closeModal = () => {
  visible.value = false;
  emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
[data-theme="dark"] {
  /* Dark theme colors */
  --border-color: #333333; /* Darker border for dark theme */
}

[data-theme="light"] {
  /* Light theme colors */
  --border-color: #ffffff; /* Light border for light theme */
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 20px;
  border-radius: 5px;
  z-index: 100;
  border-style: solid;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
