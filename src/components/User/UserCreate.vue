<template>
  <div class="create-user__button">
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="showCreateUserForm"
    >
      Crear Usuario
    </el-button>
  </div>
  <!-- Se ha separado el dialog form del componente de crear,
   principalemnte porque si hubiera una edición seguramente usaría
   el mismo formulario. Aparte de que así se deja más limpio este componente -->
  <dialog-form-user
      v-if="isVisible"
      :loading="loading"
      @save="create"
      @closeModal="hideCreateUserForm"
  />
</template>
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { ref, getCurrentInstance } from "vue";
import DialogFormUser from "@/components/User/DialogFormUser.vue";
import type UserStructure from "@/Services/User/UserStructure";
import { createUserUseCase } from "@/Services/User";
import { ElNotification } from "element-plus";

const isVisible = ref<boolean>(false);
const loading = ref<boolean>(false);
const emitter = getCurrentInstance()?.proxy.emitter;
const hideCreateUserForm = () => {
  isVisible.value = false;
}
const showCreateUserForm = () => {
  isVisible.value = true;
}

const create = async (user: UserStructure) => {
  loading.value = true;
  const response = await createUserUseCase.execute(user);
  loading.value = false;

  if (!response.success) {
    ElNotification({
      title: 'Error al guardar',
      message: 'Ha ocurrido un error al guardar el usuario',
      type: 'error',
    });
    return;
  }

  ElNotification({
    title: 'Usuario creado correctamente',
    message: `Se ha creado el usuario ${user.name} correctamente`,
    type: 'success',
  });

  emitter.emit('userWasCreated');
  hideCreateUserForm();
}
</script>
