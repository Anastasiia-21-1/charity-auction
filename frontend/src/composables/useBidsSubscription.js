import {onMounted, onUnmounted} from 'vue';
import {socket} from '@/lib/socket.js';
import {useAuctionsStore} from "@/stores/auctions.js";

export function useBidsSubscription(auctionId) {
  const event = `auction-bids:${auctionId}`;

  const auctionsStore = useAuctionsStore()

  onMounted(() => {
    socket.on(event, (data) => {
      auctionsStore.addNewAuctionBid(auctionId, data);
    });
  });

  onUnmounted(() => {
    socket.off(event);
  });
}
