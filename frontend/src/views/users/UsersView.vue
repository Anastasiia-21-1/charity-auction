<script setup>
import {onMounted} from "vue";
import {useUsersStore} from "@/stores/users.js";
import UserCard from "@/components/users/UserCard.vue";
import {useRouter} from "vue-router";

const store = useUsersStore()

onMounted(() => {
  store.dispatchGetUsers()
})

const router = useRouter()
</script>

<template>
  <main class="space-y-2">
    <h1 class="text-xl">
      {{ $t('users.title') }}
    </h1>
    <div class="flex flex-wrap gap-4">
      <button
        v-for="{id, email, name} in store.users"
        @click="router.push(`/users/${id}`)"
      >
        <UserCard
          :id="id"
          :name="name || undefined"
          :email="email"
        />
      </button>
    </div>
  </main>
</template>
