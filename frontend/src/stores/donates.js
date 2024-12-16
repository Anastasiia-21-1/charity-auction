import {defineStore} from "pinia";
import {ref} from "vue";
import {api} from "@/lib/axios.js";

export const useDonatesStore = defineStore("donates", () => {
  const donates = ref([]);

  function initDonates(data) {
    donates.value = data
  }

  function addNewDonate(donate) {
    donates.value.push(donate);
  }

  async function dispatchGetDonates() {
    const {data} = await api.get("/donates");
    initDonates(data);
  }

  async function dispatchCreateDonate(donate) {
    await api.post("/donates", donate);
    await dispatchGetDonates()
  }

  return {
    donates,
    initDonates,
    addNewDonate,
    dispatchGetDonates,
    dispatchCreateDonate,
  }
})
