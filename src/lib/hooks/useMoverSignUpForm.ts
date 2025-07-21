import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFetchError, SignupFormValues } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "../schemas/auth.schemas";
import { defaultFetch } from "../api/fetch-client";

function useMoverSignUpForm() {
   const router = useRouter();
   const { getUser } = useAuth();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid },
   } = useForm<SignupFormValues>({
      resolver: zodResolver(signUpFormSchema),
      mode: "onChange",
   });

   const onSubmit = async (data: SignupFormValues) => {
      setIsLoading(true);

      try {
         const res = await defaultFetch("/auth/signup/mover", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (res.data.accessToken && res.data.user) {
            getUser(res.data.user, res.data.accessToken);
            router.push("/profile/create"); //디버깅: 프로필로 이동하도록 수정해야함
         }
      } catch (error) {
         console.error("기사님 회원가입 실패: ", error);

         const customError = error as AuthFetchError;

         if (customError?.status) {
            Object.entries(customError.body.data!).forEach(([key, message]) => {
               setError(key as keyof SignupFormValues, {
                  type: "server",
                  message: String(message),
               });
            });
         } else {
            console.error("예상치 못한 에러: ", customError?.body.message);
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

export default useMoverSignUpForm;
