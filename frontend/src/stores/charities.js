import {defineStore} from "pinia";
import {ref} from "vue";
import {api} from "@/lib/axios.js";

export const useCharitiesStore = defineStore("charities", () => {
  const charities = ref([]);

  function initCharities(data) {
    charities.value = data
  }

  function addNewCharity(user) {
    charities.value.push(user);
  }

  async function dispatchGetCharities() {
    const {data} = await api.get("/charities");
    initCharities(data);
  }

  async function dispatchCreateCharity(auction) {
    const {data} = await api.post("/charities", auction);
    initCharities(data);
  }

  return {
    charities,
    initCharities,
    addNewCharity,
    dispatchGetCharities,
    dispatchCreateCharity,
  }
})
