<template>
  <user-list>
    <!--
      Pasamos el componente user-delete como slot, ya que en este
      caso usamos el container como orquestador. Cierto es, que la
      propia lista podría pintarlo directamente sin que este sea un slot.
      Todo es decirdirlo.
    -->
    <template #delete="{ user }">
      <user-delete :user="user" />
    </template>
  </user-list>
  <user-details />
</template>
<script setup lang="ts">
import UserList from "@/components/User/UserList.vue";
import UserDetails from "@/components/User/UserDetails.vue";
import UserDelete from "@/components/User/UserDelete.vue";

/**
 * Suelo hacer componentes por responsabilidad y dejando este componente Container
 * como "orquestador". También se podría usar el componente View para ello y prescindir de este.
 */
</script>
