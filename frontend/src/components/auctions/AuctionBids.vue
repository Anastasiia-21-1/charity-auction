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
import {useBidsSubscription} from "@/composables/useBidsSubscription.js";
import Toast from "primevue/toast";
import {useI18n} from "vue-i18n";

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
const i18n = useI18n()

const onSubmit = handleSubmit(async ({amount}) => {
  try {
    const minAmount = Math.max((biggestBet?.amount ?? 0), current?.value?.startingPrice ?? 0)
    if (+amount < minAmount + 1) {
      toast.add({
        severity: 'error',
        summary: i18n.t('auctions.minBetError') + minAmount + 1,
        life: 2000,
      })
      return
    }

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

useBidsSubscription(route.params.id)

</script>

<template>
  <div class="flex flex-col gap-4">
    <h2>
      {{ $t('auctions.biggestBet') }}: {{ biggestBet?.amount ?? 0 }} {{ current?.charity?.currency }}
      <span v-if="biggestBet?.userId === currentUserId" class="text-emerald-500">
        {{ $t('auctions.yourBet') }}
      </span>
    </h2>

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
  <Toast/>
</template>
