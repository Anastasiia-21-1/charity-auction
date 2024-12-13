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
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import {useCharitiesStore} from "@/stores/charities.js";
import {computed, onMounted} from "vue";

const charitiesStore = useCharitiesStore()

onMounted(() => {
  charitiesStore.dispatchGetCharities()
})

const authSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  startingPrice: yup.string().required(),
  currency: yup.string().required(),
  endsAt: yup.string().required(),
  charityId: yup.object({
    name: yup.string().required(),
    code: yup.string().required(),
  }).required(),
})

const {defineField, handleSubmit, errors} = useForm({
  validationSchema: toTypedSchema(authSchema),
})

const [title] = defineField('title')
const [description] = defineField('description')
const [startingPrice] = defineField('startingPrice')
const [currency] = defineField('currency')
const [endsAt] = defineField('endsAt')
const [charityId] = defineField('charityId')

const toast = useToast()
const router = useRouter()

const onSubmit = handleSubmit(async ({title, description, startingPrice, currency, endsAt, charityId}) => {
  try {
    await api.post('/auctions', {
      title,
      description,
      startingPrice: +startingPrice,
      currency,
      endsAt,
      charityId: charityId.code
    })

    await router.push('/auctions')
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

const charityOptions = computed(() => {
  return charitiesStore.charities.map(charity => ({
    name: charity.name,
    code: charity.id,
  }))
})
</script>

<template>
  <main class="space-y-2">
    <h1 class="text-xl">
      {{ $t('auctions.new') }}
    </h1>

    <form @submit="onSubmit" class="space-y-2">
      <div>
        <label class="block" for="email">{{ $t('auctions.fields.title') }}</label>
        <InputText
          v-model="title"
          aria-describedby="title-help"
          type="text"
          :class="{ 'p-invalid': errors.title }"
        />
        <small id="title-help" class="block">{{ errors.title }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('auctions.fields.description') }}</label>
        <InputText
          v-model="description"
          aria-describedby="description-help"
          type="text"
          :class="{ 'p-invalid': errors.description }"
        />
        <small id="description-help" class="block">{{ errors.description }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('auctions.fields.startingPrice') }}</label>
        <InputText
          v-model="startingPrice"
          aria-describedby="startingPrice-help"
          type="number"
          :class="{ 'p-invalid': errors.startingPrice }"
        />
        <small id="startingPrice-help" class="block">{{ errors.startingPrice }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('auctions.fields.currency') }}</label>
        <InputText
          v-model="currency"
          aria-describedby="currency-help"
          type="text"
          :class="{ 'p-invalid': errors.currency }"
        />
        <small id="currency-help" class="block">{{ errors.currency }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('auctions.fields.endsAt') }}</label>
        <DatePicker
          v-model="endsAt"
          aria-describedby="endsAt-help"
          :class="{ 'p-invalid': errors.endsAt }"
        />
        <small id="endsAt-help" class="block">{{ errors.endsAt }}</small>
      </div>

      <div>
        <label class="block" for="email">{{ $t('auctions.fields.charityId') }}</label>
        <Select
          v-model="charityId"
          :options="charityOptions"
          optionLabel="name"
          aria-describedby="charityId-help"
          :class="{ 'p-invalid': errors.charityId }"
        />
        <small id="charityId-help" class="block">{{ errors.charityId }}</small>
      </div>

      <Button type="submit">{{ $t('auctions.new') }}</Button>
    </form>
  </main>
</template>
