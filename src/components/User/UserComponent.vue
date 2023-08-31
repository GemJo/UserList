<template>
  <user-list />
  <user-details />
</template>
<script setup lang="ts">
import UserList from "@/components/User/UserList.vue";
import UserDetails from "@/components/User/UserDetails.vue";

/**
 * Suelo hacer componentes por responsabilidad y dejando este componente Container
 * como "orquestador". También se podría usar el componente View para ello y prescindir de este.
 */
</script>
