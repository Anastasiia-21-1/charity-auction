<script setup>
import Button  from "primevue/button";
import {useRouter} from "vue-router";

const props = defineProps({
  id: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  startingPrice: {
    type: Number
  },
  currency: {
    type: String
  },
  sellerId: {
    type: String
  },
  sellerName: {
    type: String,
    default: "Anonymous"
  },
  endsAt: {
    type: String
  },
  createdAt: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png"
  }
})

const router = useRouter()

</script>

<template>
  <div class="w-64 p-2 border border-zinc-200 rounded-lg flex flex-col gap-3">
    <img :src="props.imageUrl" alt="" class="object-cover w-full h-32 rounded-md">
    <div class="flex gap-4">
      <h2>
        {{ props.title }}
      </h2>

      <div>
        {{$t('auctions.startingAt')}}: {{ props.startingPrice }} {{ props.currency }}
      </div>
    </div>
    <div class="line-clamp-1">
      {{props.description}}
    </div>
    <button class="flex gap-2" @click="router.push(`/users/${props.sellerId}`)">
      <div class="size-6 flex justify-center items-center text-white text-xs rounded-full bg-emerald-400">
        {{ props.sellerName.slice(0, 1) }}
      </div>
      <div>
        {{props.sellerName}}
      </div>
    </button>
    <Button @click="router.push(`/auctions/${props.id}`)">
      {{$t('auctions.goTo')}}
    </Button>
  </div>
</template>
