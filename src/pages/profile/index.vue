<template>
  <v-sheet>
    <h1>Test</h1>
    <div>Profile Page</div>
    <div>
      <QuillEditor v-model:content="content" contentType="text" theme="snow" />
      <v-btn @click="btnSubmit">Send</v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
const content = ref("");
const btnSubmit = () => console.log(content.value);
</script>

<style scoped lang="scss"></style>
