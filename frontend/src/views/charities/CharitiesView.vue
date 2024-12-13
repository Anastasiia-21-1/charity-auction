<script setup>
import {onMounted} from "vue";
import Button from "primevue/button";
import {useCharitiesStore} from "@/stores/charities.js";
import CharityCard from "@/components/charities/CharityCard.vue";

const store = useCharitiesStore()

onMounted(() => {
  store.dispatchGetCharities()
})
</script>

<template>
  <main class="space-y-2">
    <h1 class="text-xl">
      {{ $t('charities.title') }}
    </h1>
    <div>
      <RouterLink to="/charities/new">
        <Button>
          {{ $t('charities.new') }} <i class="pi pi-plus"/>
        </Button>
      </RouterLink>
    </div>
    <div class="flex flex-wrap gap-4">
      <CharityCard
        v-for="{id, name, description, website} in store.charities"
        :id="id"
        :name="name"
        :description="description"
        :website="website"
      />
    </div>
  </main>
</template>
