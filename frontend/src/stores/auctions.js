import {defineStore} from "pinia";
import {ref} from "vue";
import {api} from "@/lib/axios.js";

export const useAuctionsStore = defineStore("auctionsStore", () => {
  const auctions = ref([]);

  function initAuctions(data) {
    auctions.value = data
  }

  function addNewAuction(user) {
    auctions.value.push(user);
  }

  async function dispatchGetAuctions() {
    const {data} = await api.get("/auctions");
    initAuctions(data);
  }

  async function dispatchCreateAuction(user) {
    const {data} = await api.post("/auctions", user);
    initAuctions(data);
  }

  return {
    auctions,
    initAuctions,
    addNewAuction,
    dispatchGetAuctions,
    dispatchCreateAuction,
  }
})
