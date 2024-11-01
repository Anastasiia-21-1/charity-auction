<script setup>
import {useAuctionsStore} from "@/stores/auctions.js";

const store = useAuctionsStore()
</script>

<template>
  <main>
    <div>{{JSON.stringify(store.auctions)}}</div>
  </main>
</template>
