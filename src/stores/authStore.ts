// Utilities
import { defineStore } from "pinia";
type UserInfo = {
  id: string;
  access_token: string;
  refresh_token: string;
};
export const useAuthStore = defineStore("user", {
  state: () => ({
    user_info: {
      id: "",
      access_token: "",
      refresh_token: "",
    },
  }),
  actions: {
    // Action to set user information
    setUserInfo(userInfo: UserInfo) {
      this.user_info = userInfo;
    },

    // Action to get user information
    getUserInfo() {
      return this.user_info;
    },
  },
  persist: {
    storage: sessionStorage,
    key: "userInfo",
    serializer: {
      // Called before storing the state
      serialize: (state) => JSON.stringify(state),
      // Called after retrieving the state
      deserialize: (state) => JSON.parse(state),
    },
  },
});
