<script setup>
import {onMounted} from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useAuctionsStore} from "@/stores/auctions.js";

const store = useAuctionsStore()

onMounted(async () => {
  await store.dispatchGetAuctions()
})

</script>
<template>
  <div>
    <DataTable :value="store.auctions" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"/>
      <Column field="title" header="Title"/>
      <Column field="description" header="Description"/>
      <Column field="startingPrice" header="Starting price"/>
      <Column field="endsAt" header="Ends at"/>
    </DataTable>
  </div>
</template>
