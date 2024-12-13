<script setup>
const props = defineProps({
  id: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  website: {
    type: String
  },
})
</script>
<template>
  <div class="w-64 p-2 border border-zinc-200 rounded-lg flex flex-col gap-3">
    <h2>
      {{ props.name }}
    </h2>

    <div class="line-clamp-1">
      {{ props.description }}
    </div>

    <div>
      {{ props.website }}
    </div>
  </div>
</template>
