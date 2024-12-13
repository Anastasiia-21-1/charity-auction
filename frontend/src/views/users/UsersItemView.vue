<script setup>
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useUsersStore} from "@/stores/users.js";
import * as yup from "yup";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {useToast} from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {api} from "@/lib/axios.js";
import {AxiosError} from "axios";
import {format} from "date-fns";

const auctionStore = useUsersStore()

onMounted(() => {
  auctionStore.dispatchGetUsers()
})

const route = useRoute();

const current = computed(() => {
  const {id} = route.params;
  return auctionStore.users.find(auction => auction.id === id)
})

const authSchema = yup.object({
  comment: yup.string().required(),
  rating: yup.string().matches(/^[1-5]$/, 'Rating must be a number string from 1 to 5').required(),
})

const {defineField, handleSubmit, errors} = useForm({
  validationSchema: toTypedSchema(authSchema),
})

const [comment] = defineField('comment')
const [rating] = defineField('rating')

const toast = useToast()

const onSubmit = handleSubmit(async ({ comment, rating }) => {
  try {
    await api.post('/users/review', {
      comment,
      rating: +rating,
      sellerId: route.params.id
    })
    await auctionStore.dispatchGetUsers()
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
  <main>
    <h1>
      {{ current?.name }}
    </h1>
    <p>
      {{ current?.email }}
    </p>

    <div>
      <div>
        {{ $t('users.comments') }}:
      </div>
      <div class="space-y">
        <div v-for="({rating, comment, createdAt}, i) in current?.sellerReviews" :key="i" class="p-5 border border-zinc-200 rounded-lg">
          <div class="flex justify-between w-full">
            <div>
              {{ rating }} {{ $t('users.of') }} 5
            </div>
            <div>
              {{ format(new Date(createdAt), 'HH:mm:ss dd/MM/yyyy') }}
            </div>
          </div>
          <div>
            {{ comment }}
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div>
      <form @submit="onSubmit">
        <div>
          <label class="block mt-5 mb-1" for="comment">{{ $t('users.fields.comment') }}</label>
          <InputText
            v-model="comment"
            aria-describedby="comment-help"
            type="text"
            :class="{ 'p-invalid': errors.comment }"
          />
          <small id="comment-help" class="block">{{ errors.comment }}</small>
        </div>

        <div>
          <label class="block mt-5 mb-1" for="rating">{{ $t('users.fields.rating') }}</label>
          <InputText
            v-model="rating"
            aria-describedby="rating-help"
            type="number"
            :class="{ 'p-invalid': errors.rating }"
          />
          <small id="rating-help" class="block">{{ errors.rating }}</small>
        </div>

        <Button type="submit" class="mt-5">{{ $t('users.fields.submit') }}</Button>
      </form>
    </div>
  </main>
</template>
