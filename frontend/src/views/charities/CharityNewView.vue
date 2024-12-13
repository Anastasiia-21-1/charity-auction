<script setup>
import * as yup from "yup";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {api} from "@/lib/axios.js";
import {AxiosError} from "axios";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const toast = useToast()

const authSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  website: yup.string().required(),
})

const {defineField, handleSubmit, errors} = useForm({
  validationSchema: toTypedSchema(authSchema),
})

const [name] = defineField('name')
const [description] = defineField('description')
const [website] = defineField('website')

const router = useRouter()

const onSubmit = handleSubmit(async ({name, description, website}) => {
  try {
    await api.post('/charities', {
      name,
      description,
      website
    })

    await router.push('/charities')
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
  <main class="space-y-2">
    <h1 class="text-xl">
      {{ $t('charities.new') }}
    </h1>

    <form @submit="onSubmit" class="space-y-2">
      <div>
        <label class="block" for="email">{{ $t('charities.fields.name') }}</label>
        <InputText
          v-model="name"
          aria-describedby="name-help"
          type="text"
          :class="{ 'p-invalid': errors.name }"
        />
        <small id="name-help" class="block">{{ errors.name }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('charities.fields.description') }}</label>
        <InputText
          v-model="description"
          aria-describedby="description-help"
          type="text"
          :class="{ 'p-invalid': errors.description }"
        />
        <small id="description-help" class="block">{{ errors.description }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('charities.fields.website') }}</label>
        <InputText
          v-model="website"
          aria-describedby="website-help"
          type="text"
          :class="{ 'p-invalid': errors.website }"
        />
        <small id="website-help" class="block">{{ errors.website }}</small>
      </div>

      <Button type="submit">{{ $t('charities.new') }}</Button>
    </form>
  </main>
</template>
