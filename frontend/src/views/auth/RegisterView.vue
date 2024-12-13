<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useToast } from 'primevue/usetoast'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import { api } from "@/lib/axios"
import Button from "primevue/button";

const authSchema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(authSchema),
})

const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')

const toast = useToast()
const router = useRouter()

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    const { data } = await api.post('/auth/register', {
      email,
      password,
    })
    localStorage.setItem('token', data.token)
    await router.push('/')
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.add({
        severity: 'error',
        summary: error.response?.data.message,
        life: 2000,
      })
    }
  }
})
</script>

<template>
  <div>
    <h1 class="text-center">{{$t('auth.password')}}</h1>
    <div>
      <form @submit="onSubmit">
        <div>
          <label class="block mt-5 mb-1" for="email">{{$t('auth.name')}}</label>
          <InputText
            v-model="name"
            aria-describedby="name-help"
            type="name"
            :class="{ 'p-invalid': errors.name }"
          />
          <small id="name-help" class="block">{{ errors.name }}</small>
        </div>

        <div>
          <label class="block mt-5 mb-1" for="email">{{$t('auth.email')}}</label>
          <InputText
            v-model="email"
            aria-describedby="email-help"
            type="email"
            :class="{ 'p-invalid': errors.email }"
          />
          <small id="email-help" class="block">{{ errors.email }}</small>
        </div>

        <div>
          <label class="block mt-5 mb-1" for="password">{{$t('auth.password')}}</label>
          <InputText
            v-model="password"
            aria-describedby="password-help"

            type="password"
            :class="{ 'p-invalid': errors.password }"
          />
          <small id="password-help" class="block">{{ errors.password }}</small>
        </div>
        <RouterLink to="/auth/login" class="block text-emerald-500">{{$t('auth.alreadyHaveAcc')}}</RouterLink>

        <Button type="submit" class="mt-5">{{$t('auth.submitLogin')}}</Button>
      </form>
    </div>
  </div>
</template>
