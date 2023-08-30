<template>
 <el-container>
   <el-header>
     <h1>{{ useRoute().meta.title || '' }}</h1>
   </el-header>
   <el-main>
     <slot />
   </el-main>
 </el-container>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
</script>


<style scoped>

</style>