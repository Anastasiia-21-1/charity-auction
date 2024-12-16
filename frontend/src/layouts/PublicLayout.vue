<script setup>
import {useRouter} from "vue-router";

const isLoggedIn = !!localStorage.getItem('token')

const router = useRouter()

function handleLogout() {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<template>
  <main>
    <nav class="border-b-2 border-emerald-500 p-4 flex justify-between">
      <div class="flex gap-4">
        <RouterLink to="/">
          {{$t('header.home')}}
        </RouterLink>
        <RouterLink to="/auctions">
          {{$t('header.auctions')}}
        </RouterLink>
        <RouterLink to="/charities">
          {{$t('header.charities')}}
        </RouterLink>
        <RouterLink to="/users">
          {{$t('header.users')}}
        </RouterLink>
        <RouterLink to="/donates/my">
          {{$t('header.myDonates')}}
        </RouterLink>
      </div>
      <div class="flex gap-4">
        <RouterLink to="/admin" v-if="isLoggedIn">
          {{$t('header.adminPanel')}}
        </RouterLink>
        <button @click="handleLogout" v-if="isLoggedIn">
          {{$t('header.logout')}}
        </button>
        <RouterLink v-else to="/auth/login">
          {{$t('header.login')}}
        </RouterLink>
      </div>
    </nav>
    <div class="p-5">
      <RouterView/>
    </div>
  </main>
</template>
