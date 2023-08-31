<template>
  <el-dialog
      v-model="isVisible"
      v-loading="loading"
      title="Crear usuario"
      width="600"
      align-center
      class="dialog-scrollable"
      @close="$emit('closeModal')"
  >
    <el-alert :closable="false" v-show="hasErrors" title="Por favor, revisa el formulario" type="error" />
    <el-form
        ref="formRef"
        :model="user"
        :rules="rules"
        label-position="top"
    >
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="user.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nombre de usurio" prop="username">
        <el-input v-model="user.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="user.email" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Teléfono" prop="phone">
        <el-input v-model="user.phone" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Sitio web" prop="website">
        <el-input v-model="user.website" type="text" autocomplete="off" />
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Calle" prop="address.street">
            <el-input v-model="user.address.street" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Puerta" prop="address.suite">
            <el-input v-model="user.address.suite" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Ciudad" prop="address.city">
            <el-input v-model="user.address.city" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="CP" prop="address.zipcode">
            <el-input v-model="user.address.zipcode" type="number" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lat" prop="address.geo.lat">
            <el-input v-model="user.address.geo.lat" type="number" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Lng" prop="address.geo.lng">
            <el-input v-model="user.address.geo.lng" type="number" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Empresa" prop="company.name">
        <el-input v-model="user.company.name" type="text" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeModal')">Cancel</el-button>
        <el-button type="primary" @click="validateAndSave(formRef)">
          Gaurdar
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type UserStructure from "@/Services/User/UserStructure";
import type {FormInstance, FormRules} from "element-plus";
import Validations from "@/Services/Validations/Validations";

interface Props {
  loading?: boolean,
}
const props = defineProps<Props>();

const emits = defineEmits(['save'])
const isVisible = ref<boolean>(true);
const formRef = ref<FormInstance>();
const hasErrors = ref<boolean>(false);

const user = reactive<UserStructure>({
  id: null,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: ''
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
});


/**
 * quizás sería interesante hacer algún servicio o composable para llevar
 * las validaciones fuera.
 */
const rules = reactive<FormRules<typeof user>>({
  name: [
    { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
    { validator: Validations.getValidationComponent('lengthString'), trigger: 'blur' },
  ],
  username: [
    { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
    { validator: Validations.getValidationComponent('lengthString', { max: 50 }), trigger: 'blur' },
  ],
  email: [
    { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
    { validator: Validations.getValidationComponent('email') },
  ],
  address: {
    street: [
      { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
      { validator: Validations.getValidationComponent('lengthString') },
    ],
    suite: [
      { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
      { validator: Validations.getValidationComponent('lengthString', { max: 30 }) },
    ],
    city: [
      { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
      { validator: Validations.getValidationComponent('lengthString', { max: 50 }) },
    ],
    zipcode: [
      { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
      { validator: Validations.getValidationComponent('positiveNumber') },
    ],
    geo: {
      lat: [
        { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
        { validator: Validations.getValidationComponent('number') },
      ],
      lng: [
        { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
        { validator: Validations.getValidationComponent('number') },
      ],
    }
  },
  phone: [
    { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
    { validator: Validations.getValidationComponent('lengthString', { min: 9 , max: 13 }) },
  ],
  website: [
    { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
    { validator: Validations.getValidationComponent('lengthString') },
  ],
  company: {
    name: [
      { validator: Validations.getValidationComponent('required'), trigger: 'blur' },
      { validator: Validations.getValidationComponent('lengthString') },
    ],
    catchPhrase: '',
    bs: ''
  }
});

const validateAndSave = (formEl: FormInstance | undefined) => {
  hasErrors.value = false;
  if (!formEl) {
    return;
  }

  formEl.validate((valid) => {
    if (valid) {
      emits('save', user);
      return;
    }
    hasErrors.value = true;
  })
}
</script>