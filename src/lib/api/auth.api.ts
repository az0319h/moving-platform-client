import { tokenFetch } from "./fetch-client";

const authApi = {
   // 사용자 호출
   getMe: async () => await tokenFetch("/auth"),
};

export default authApi;
