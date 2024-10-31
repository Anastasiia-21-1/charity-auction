import {defineStore} from "pinia";
import {ref} from "vue";
import {api} from "@/lib/axios.js";

export const useUsersStore = defineStore("usersStore", () => {
  const users = ref([]);

  function initUsers(data) {
    users.value = data
  }

  function addNewUser(user) {
    users.value.push(user);
  }

  async function dispatchGetUsers() {
    const {data} = await api.get("/users");
    initUsers(data);
  }

  async function dispatchCreateUser(user) {
    const {data} = await api.post("/users", user);
    initUsers(data);
  }

  return {
    users,
    initUsers,
    addNewUser,
    dispatchGetUsers,
    dispatchCreateUser,
  }
})
