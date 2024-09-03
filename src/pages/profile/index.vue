<template>
  <v-sheet>
    <h1>Test</h1>
    <div>Profile Page</div>
    <div ref="editorContainer" class="editor"></div>
    <v-btn @click="submitBtn">Submit</v-btn>
  </v-sheet>
</template>

<script setup>
import globalOptions from "@/configs/quillConfig";
import { Quill } from "@vueup/vue-quill";
import { ref, onMounted } from "vue";

const editorContainer = ref(null);
let quill;
onMounted(() => {
  quill = new Quill(editorContainer.value, globalOptions);
});

function submitBtn() {
  console.log(quill.getText());
  if (quill) {
    quill.setText(""); // This sets the editor's content to an empty string
  }
}
</script>

<style>
.editor {
  height: 300px;
}
</style>
