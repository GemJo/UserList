<template>
  <el-dialog
      v-model="isVisible"
      :title="user?.name || 'Usuario no encontrado'"
      width="60%"
      align-center
      @closed="hideDetailsDialog"
  >
    <!-- Se podría simplificar en un bucle con algún objeto que hiciera relación
         con la key de user y el label. Sin embargo, al no mosrtrarlo todo de igual
         manera quizás hubiera acabado más enrevesado con if y else -->
    <el-descriptions v-if="user" direction="vertical" :column="2" class="user-details">
      <el-descriptions-item label="Nombre" v-bind="defaultPropertiesDescription">
        {{ user.name }}
      </el-descriptions-item>
      <el-descriptions-item label="Username" v-bind="defaultPropertiesDescription">
        {{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item label="Email" v-bind="defaultPropertiesDescription">
        {{ user.email }}
      </el-descriptions-item>
      <el-descriptions-item label="Teléfono" v-bind="defaultPropertiesDescription">
        {{ user.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="Dirección" v-bind="defaultPropertiesDescription" :span="2">
        {{ user.address.street }}, {{ user.address.suite }}. {{ user.address.city }}. {{ user.address.zipcode }}
        <el-text size="small" type="info">({{user.address.geo.lat}} - {{user.address.geo.lng}})</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="Sitio web" v-bind="defaultPropertiesDescription">
        {{ user.website }}
      </el-descriptions-item>
      <el-descriptions-item label="Compañia" v-bind="defaultPropertiesDescription">
        {{ user.company.name }}<br/>{{ user.company.catchPhrase }}<br/>{{ user.company.bs}}
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideDetailsDialog">Cerrar</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, getCurrentInstance} from "vue";
import type UserStructure from "@/Services/User/UserStructure";
import { getUserUseCase } from "@/Services/User";

const emitter = getCurrentInstance()?.proxy.emitter;

const isVisible = ref<boolean>(false);
const user = ref<UserStructure>();

const defaultPropertiesDescription = {
  'class-name': 'user-details__text',
  'label-class-name': 'user-details__label',
}
const showDetailsDialog = () => {
  isVisible.value = true;
}
const hideDetailsDialog = () => {
  isVisible.value = false;
}

async function loadUser(id: string) {
  const response = await getUserUseCase.execute(id);
  if (!response.success) {
    hideDetailsDialog();
    return;
  }

  user.value = response.user;
  showDetailsDialog();
}

onBeforeMount(() => {
  emitter.on('showUserDetailsIsNeeded', loadUser);
});
onBeforeUnmount(() => {
  emitter.off('showUserDetailsIsNeeded', loadUser);
})
</script>