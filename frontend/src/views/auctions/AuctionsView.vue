<script setup>
import {useAuctionsStore} from "@/stores/auctions.js";
import {onMounted} from "vue";
import AuctionCard from "@/components/auctions/AuctionCard.vue";
import Button from "primevue/button";

const store = useAuctionsStore()

onMounted(() => {
  store.dispatchGetAuctions()
})
</script>

<template>
  <main class="space-y-2">
    <h1 class="text-xl">
      {{ $t('auctions.title') }}
    </h1>
    <div>
      <RouterLink to="/auctions/new">
        <Button>
          {{$t('auctions.new')}} <i class="pi pi-plus"/>
        </Button>
      </RouterLink>
    </div>
    <div class="flex flex-wrap gap-4">
      <AuctionCard
        v-for="{id, title, description, startingPrice, currency, seller, createdAt, endsAt, images} in store.auctions"
        :id="id"
        :title="title"
        :description="description"
        :startingPrice="startingPrice"
        :currency="currency"
        :seller-name="seller.name || undefined"
        :seller-id="seller.id"
        :created-at="createdAt"
        :ends-at="endsAt"
        :image-url="images[0]?.url"
      />
    </div>
  </main>
</template>
