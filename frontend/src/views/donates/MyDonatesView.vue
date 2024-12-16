<script setup>

import {useDonatesStore} from "@/stores/donates.js";
import {computed, onMounted} from "vue";
import {jwtDecode} from "jwt-decode";
import DonateRow from "@/components/donates/DonateRow.vue";

const donatesStore = useDonatesStore()

const token = localStorage.getItem('token');
const currentUserId = token && jwtDecode(token)?.id

onMounted(() => {
  donatesStore.dispatchGetDonates()
})

const myDonates = computed(() => {
  return donatesStore.donates.filter(donate => donate.userId === currentUserId)
})

</script>
<template>
  <main class="space-y-2">
    <DonateRow
      v-for="{charity, amount} in myDonates"
      :charity-description="charity.description"
      :charity-name="charity.name"
      :amount="amount"
    />
  </main>
</template>
