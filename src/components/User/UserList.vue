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
  </el-table>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { ElNotification } from "element-plus";
import type ListUser from "@/Services/User/ListUser/ListUser";
import { listUserUseCase } from "@/Services/User";

const loading = ref<boolean>(true);
const userList = ref<ListUser[]>([]);

async function loadUserList() {
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

onBeforeMount(() => {
  loadUserList();
});
</script>