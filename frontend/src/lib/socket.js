import {reactive} from "vue";
import {io} from "socket.io-client";

export const state = reactive({
  connected: false,
});

export const socket = io(import.meta.env.VITE_BACKEND_API_URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
