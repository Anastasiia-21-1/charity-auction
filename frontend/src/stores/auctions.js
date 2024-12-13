import {defineStore} from "pinia";
import {ref} from "vue";
import {api} from "@/lib/axios.js";

export const useAuctionsStore = defineStore("auction", () => {
  const auctions = ref([]);

  function initAuctions(data) {
    auctions.value = data
  }

  function addNewAuction(user) {
    auctions.value.push(user);
  }

  function addNewAuctionBid(auctionId, bid) {
    const auction = auctions.value.find(auction => auction.id === auctionId);
    if (!auction) return
    auction.bids.push(bid);
  }

  async function dispatchGetAuctions() {
    const {data} = await api.get("/auctions");
    initAuctions(data);
  }

  async function dispatchCreateAuction(auction) {
    const {data} = await api.post("/auctions", auction);
    initAuctions(data);
  }

  return {
    auctions,
    initAuctions,
    addNewAuction,
    addNewAuctionBid,
    dispatchGetAuctions,
    dispatchCreateAuction,
  }
})
