<template>
  <component :is="layoutToShow">
    <RouterView />
  </component>
</template>
<script setup lang='ts'>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue';
import type { Component } from 'vue';
import DefaultLayout from '@/views/layouts/DefaultLayout.vue';


const layouts: {[key: string]: Component} = {
   default: DefaultLayout,
};

const layoutToShow = computed<Component>(() => {
  if (!useRoute().meta.layout) {
    return layouts['default'];
  }

  return layouts[useRoute().meta.layout as string];
})
</script>


<style scoped>

</style>
