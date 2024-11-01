<script setup>
import {useUsersStore} from "@/stores/users.js";
import {onMounted} from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const store = useUsersStore()

onMounted(async () => {
  await store.dispatchGetUsers()
})

</script>
<template>
  <div>
    <DataTable :value="store.users" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="createdAt" header="Created at"></Column>
    </DataTable>
  </div>
</template>
