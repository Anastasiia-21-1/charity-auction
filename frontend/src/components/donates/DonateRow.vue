<script setup>
defineProps({
  amount: {
    type: Number,
    required: true
  },
  charityName: {
    type: String,
    required: true
  },
  charityDescription: {
    type: String,
  },
})
</script>

<template>
<div class="p-4 border rounded-lg">
  {{charityName}} ({{charityDescription}}): {{amount}}
</div>
</template>
