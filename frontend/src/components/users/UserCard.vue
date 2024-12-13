<script setup>
const props = defineProps({
  id: {
    type: String
  },
  name: {
    type: String,
    default: "Anonymous"
  },
  email: {
    type: String
  },
})
</script>
<template>
  <div class="w-64 p-2 border border-zinc-200 rounded-lg flex flex-col gap-3">
    <h2>
      {{ props.name }}
    </h2>

    <div>
      {{ props.email }}
    </div>
  </div>
</template>
