// Utilities
import { defineStore } from "pinia";

import { deleteCookie } from "@/utils/deleteCookie";

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
    } as UserInfo,
  }),
  getters: {
    isLogin: (state) => !!state.user_info.access_token,
  },
  actions: {
    // Action to set user information
    setUserInfo(userInfo: UserInfo) {
      this.user_info = userInfo;
    },

    // Action to get user information
    getUserInfo() {
      return this.user_info;
    },

    // Set access token only
    setAccessToken(token: string) {
      this.user_info.access_token = token;
    },

    // Set refresh token only
    setRefreshToken(token: string) {
      this.user_info.refresh_token = token;
    },

    logout() {
      this.user_info = { id: "", access_token: "", refresh_token: "" };
      deleteCookie("access_token");
      deleteCookie("refresh_token");
    },
  },
  persist: {
    storage: localStorage,
    key: "userInfo",
    serializer: {
      // Called before storing the state
      serialize: (state) => JSON.stringify(state),
      // Called after retrieving the state
      deserialize: (state) => JSON.parse(state),
    },
  },
});
