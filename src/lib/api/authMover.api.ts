import { SignupFormValues } from "../types";

async function signupMover(data: SignupFormValues) {
   const res = await fetch("/auth/signup/mover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
   });

   if (!res.ok) {
      const errorData = await res.json();

      //디버깅
      console.log("ㅇㄹ훈ㅇㅀ!!!!api의 에러데이타", errorData);

      throw {
         fieldErrors: errorData.fieldErrors,
         message: errorData.message ?? "회원가입 실패",
      };
   }

   return res.json();
}

export default signupMover;
