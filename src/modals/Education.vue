<template>
  <h1>{{ props.title }}</h1>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: String,
});
</script>

<style></style>
