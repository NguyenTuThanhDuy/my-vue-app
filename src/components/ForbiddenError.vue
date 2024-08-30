<template>
  <v-empty-state
    action-text="Retry"
    :headline="
      props.error?.error.message + ' ' + props.error?.error.code ?? '403'
    "
    title="Some error happens"
    text="There is some error with this component"
    image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});
const onClickAction = () => {
  window.location.reload();
};
</script>
