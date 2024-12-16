<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {useDonatesStore} from "@/stores/donates.js";

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

const visible = ref(false)
const amount = ref("")

const {t} = useI18n()
const donatesStore = useDonatesStore()

function handleDonate() {
  visible.value = false
  donatesStore.dispatchCreateDonate({
    charityId: props.id,
    amount: +amount.value
  })
}

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

    <Button label="Show" @click="visible = true" >
      {{$t('donates.donate')}}
    </Button>

    <Dialog v-model:visible="visible" modal :header="t('donates.donate')">
      <div class="flex items-center gap-4 mb-4">
        <label for="amount" class="font-semibold w-24">{{$t('donates.amount')}}</label>
        <InputText id="amount" class="flex-auto" v-model="amount" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="handleDonate"></Button>
      </div>
    </Dialog>
  </div>
</template>
