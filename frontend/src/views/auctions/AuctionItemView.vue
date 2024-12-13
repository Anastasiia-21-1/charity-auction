<script setup>
import {useAuctionsStore} from "@/stores/auctions.js";
import {computed, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import Button from "primevue/button";
import AuctionBids from "@/components/auctions/AuctionBids.vue";

const auctionStore = useAuctionsStore()

onMounted(() => {
  auctionStore.dispatchGetAuctions()
})

const route = useRoute();
const router = useRouter()

const current = computed(() => {
  const {id} = route.params;
  return auctionStore.auctions.find(auction => auction.id === id)
})

const sellerName = computed(() => {
  return current.value?.seller?.name ?? "Anonymous"
})

</script>

<template>
  <main>
    <h1>
      {{ current?.title }}
    </h1>
    <p>
      {{ current?.description }}
    </p>
    <span>
      {{ $t('auctions.startingAt') }} {{ current?.startingPrice }} {{ current?.charity?.currency }}
    </span>
    <button class="flex gap-2" @click="router.push(`/users/${current?.seller?.id}`)">
      <div class="size-6 flex justify-center items-center text-white text-xs rounded-full bg-emerald-400">
        {{ sellerName.slice(0, 1) }}
      </div>
      <div>
        {{ sellerName }}
      </div>
    </button>

    <AuctionBids/>
  </main>
</template>
