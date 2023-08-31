<template>
  <el-popconfirm
      width="250"
      confirm-button-text="Sí"
      cancel-button-text="No"
      :icon="InfoFilled"
      icon-color="#f56c6c"
      :title="`Estás seguro de querer borrar el usuario ${user.name}?`"
      @confirm="deleteUser"
  >
    <template #reference>
      <el-button
          :icon="DeleteFilled"
          circle
      />
    </template>
  </el-popconfirm>
</template>
<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { DeleteFilled, InfoFilled } from "@element-plus/icons-vue";
import type ListUser from "@/Services/User/ListUser/ListUser";
import { deleteUserUseCase } from "@/Services/User";
import { ElNotification } from "element-plus";

const emitter = getCurrentInstance()?.proxy.emitter;
interface Props {
  user: ListUser,
}
const props = defineProps<Props>();

const deleteUser = async () => {
  const response = await deleteUserUseCase.execute(props.user.id);

  if (!response.success) {
    ElNotification({
      title: 'Error al eliminar',
      message: 'Ha ocurrido un error al eliminar el usuario',
      type: 'error',
    });
    return;
  }

  ElNotification({
    title: 'Eliminado correctamente',
    message: `El usuario ${props.user.name}, ha sido eliminado correctamente`,
    type: 'success',
  });

  /**
   * Una vez eliminado el usuario debería de refrescarse la tabla, puesto que
   * se ha modificado. Aquí volvemos a usar el emitter para lanzar un evento
   * y así comunicarnos con el componente lista que es la encargada de listar los usuarios
   */
  emitter.emit('userWasDeleted');
}
</script>