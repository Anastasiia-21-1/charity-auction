<script setup>
import {useAuctionsStore} from "@/stores/auctions.js";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import * as yup from "yup";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {useToast} from "primevue/usetoast";
import {api} from "@/lib/axios.js";
import {AxiosError} from "axios";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {jwtDecode} from "jwt-decode";

const auctionStore = useAuctionsStore()

onMounted(() => {
  auctionStore.dispatchGetAuctions()
})

const route = useRoute();
const token = localStorage.getItem('token');
const currentUserId = token && jwtDecode(token)?.id

const current = computed(() => {
  const {id} = route.params;
  return auctionStore.auctions.find(auction => auction.id === id)
})


const authSchema = yup.object({
  amount: yup.string().required(),
})

const {defineField, handleSubmit, errors} = useForm({
  validationSchema: toTypedSchema(authSchema),
})

const [amount] = defineField('amount')

const toast = useToast()

const onSubmit = handleSubmit(async ({amount}) => {
  try {
    await api.post('/bids/make', {
      auctionId: current.value.id,
      amount: +amount,
    })
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

const biggestBet = computed(() => {
  return current.value?.bids.reduce((prev, current) => {
    return (prev.amount > current.amount) ? prev : current
  }, 0)
})

</script>

<template>
  <div class="flex flex-col gap-4">
    {{ JSON.stringify(current?.bids) }}

    <h2>
      {{ $t('auctions.biggestBet') }}: {{ biggestBet?.amount }} {{ current?.charity?.currency }}
      <span v-if="biggestBet?.userId === currentUserId" class="text-emerald-500">
        {{ $t('auctions.yourBet') }}
      </span>
    </h2>

    <h2>{{ $t('auctions.currentBet') }}</h2>

    <form @submit="onSubmit" class="space-y-2">
      <div class="flex gap-2">
        <div>
          <InputText
            id="amount"
            v-model="amount"
            aria-describedby="amount-help"
            type="number"
            :class="{ 'p-invalid': errors.amount }"
          />
          <small id="amount-help" class="block">{{ errors.amount }}</small>
        </div>

        <Button type="submit" :disabled="biggestBet?.userId === currentUserId">{{ $t('auctions.makeBet') }}</Button>
      </div>
    </form>

  </div>
</template>
