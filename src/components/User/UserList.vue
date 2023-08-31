<template>
  <el-table
    v-loading="loading"
    :data="userList"
    :default-sort="{ prop: 'name', order: 'ascending' }"
    table-layout="fixed"
  >
    <el-table-column prop="name" label="Nombre" sortable />
    <el-table-column prop="username" label="username" sortable  />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="actions" #default="{ row }" align="right">
      <el-button
          :icon="InfoFilled"
          circle
          @click="showDetailsDialog(row.id)"
      />
      <slot name="delete" :user="row" />
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import {onBeforeMount, ref, getCurrentInstance, onBeforeUnmount} from "vue";
import { ElNotification } from "element-plus";
import type ListUser from "@/Services/User/ListUser/ListUser";
import { listUserUseCase } from "@/Services/User";
import { InfoFilled } from "@element-plus/icons-vue";

const emitter = getCurrentInstance()?.proxy.emitter;

const loading = ref<boolean>(false);
const userList = ref<ListUser[]>([]);

async function loadUserList() {
  loading.value = true;
  /**
   * Se ha creado una carpeta /Services donde encontramos los casos de uso.
   * Los llevo fuera en servicios para dejar "limpio" el componente y que este solo sea para
   * mostrar y gestionar la interacción del usuario.
   * Creo que así lo hace escalable y más limpio, entre otras cosas.
   */
  const response = await listUserUseCase.execute();

  loading.value = false;
  if (!response.success) {
    ElNotification({
      title: 'Error en la carga',
      message: 'Ha ocurrido un error cargando la lista de usuarios',
      type: 'error',
    });
    return;
  }

  userList.value = response.users!;
}

const showDetailsDialog = (userId: string) => {
  /**
   * En este caso sería ideal que el propio UserDetails tuviera el botón
   * y el mismo gestionara el abrir el dialog. Sin embargo he tenido problemillas,
   * con que la tabla estaba por encima del dialog (no estoy acostumbrada a elements),
   * y para no entretenerme se ha usado el emitter (lo que sería el eventHub de vue.js)
   * evento para abrir dicho dialog.
   */
  emitter.emit('showUserDetailsIsNeeded', userId);
}

onBeforeMount(() => {
  loadUserList();
  emitter.on('userWasDeleted', loadUserList);
});
onBeforeUnmount(() => {
  emitter.off('userWasDeleted', loadUserList);
})
</script>