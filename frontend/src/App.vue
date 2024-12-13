<script setup>
import {RouterView} from 'vue-router'
import Toast from "primevue/toast";
import {onMounted, onUnmounted} from "vue";
import {socket} from "@/lib/socket.js";

onMounted(() =>{
  socket.connect()
})
onUnmounted(() =>{
  socket.disconnect()
})
</script>

<template>
  <RouterView/>
  <Toast />
</template>
