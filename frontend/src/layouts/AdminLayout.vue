<script setup>
import Button from "primevue/button";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const links = [
  {href: "/", label: t('admin.back')},
  {href: "/admin/users", label: t('admin.users')},
  {href: "/admin/auctions", label: t('admin.auctions')},
]

</script>

<template>
  <main class="flex bg-slate-100">
    <div class="w-48 pl-4 pt-4 flex flex-col gap-2">
      <RouterLink v-for="{href, label} of links" :to="href" :key="href">
        <Button class="w-full">
          {{label}}
        </Button>
      </RouterLink>
    </div>
    <div class="p-4 w-full h-screen">
      <div class="bg-white h-full rounded-2xl p-5">
        <RouterView/>
      </div>
    </div>
  </main>
</template>
