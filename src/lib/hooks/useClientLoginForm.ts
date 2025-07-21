"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormValues } from "../schemas/auth.schemas";
import { defaultFetch } from "../api/fetch-client";
import { AuthFetchError } from "../types";

export default function useClientLoginForm() {
   // ✅ 상태 모음
   const router = useRouter();
   const { getUser } = useAuth();
   const [isLoading, setIsLoading] = useState(false);

   // ✅ react-hook-form
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid },
   } = useForm({
      mode: "onChange",
      resolver: zodResolver(loginFormSchema),
   });

   // ✅ 제출
   const onSubmit = async (data: LoginFormValues) => {
      setIsLoading(true);

      try {
         const res = await defaultFetch("/auth/signin/client", {
            method: "POST",
            body: JSON.stringify(data),
         });

         if (res.data.user && res.data.accessToken) {
            await getUser(res.data.user, res.data.accessToken);
            router.replace("/mover-search");
         }
      } catch (error) {
         console.error("일반 로그인 실패: ", error);

         // 오류 처리: 메시지로
         const customError = error as AuthFetchError;

         if (customError?.body.message) {
            setError("email", {
               type: "server",
               message: customError.body.message,
            });
         } else {
            console.error("예상치 못한 오류 발생: ", customError?.body.message);
         }
      } finally {
         setIsLoading(false);
      }
   };

   return {
      register,
      errors,
      isValid,
      onSubmit,
      isLoading,
      handleSubmit,
   };
}
