import { defaultFetch, tokenFetch } from "./fetch-client";

const authApi = {
   // 회원가입
   clientSignUp: (
      name: string,
      email: string,
      phone: string,
      password: string,
      passwordConfirmation: string,
   ) => {
      defaultFetch("/auth/signup/client", {
         method: "POST",
         body: JSON.stringify({
            name,
            email,
            phone,
            password,
            passwordConfirmation,
         }),
      });
   },

   // 로그인
   clientLogin: (email: string, password: string) => {
      defaultFetch("/auth/signin/client", {
         method: "POST",
         body: JSON.stringify({ email, password }),
      });
   },

   // 사용자 호출
   getMe: async () => await tokenFetch("/auth"),
};

export default authApi;
