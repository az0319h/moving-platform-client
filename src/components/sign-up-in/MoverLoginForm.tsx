"use client";

import React, { useState } from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthFetchError, SigninFormValues } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/lib/validations/auth.schemas";
import { defaultFetch } from "@/lib/api/fetch-client";

export default function MoverLoginForm() {
   const router = useRouter();
   const { login } = useAuth();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid },
   } = useForm<SigninFormValues>({
      resolver: zodResolver(loginFormSchema),
      mode: "onChange",
   });

   const onSubmit = async (data: SigninFormValues) => {
      setIsLoading(true);

      try {
         const res = await defaultFetch("/auth/signin/mover", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (res.data.accessToken && res.data.user) {
            login(res.data.user, res.data.accessToken);
            router.push("/profile/create"); //디버깅: 프로필로 이동하도록 해결해야함
         }
      } catch (error) {
         console.error("기사님 로그인 실패:", error);

         const customError = error as AuthFetchError;

         if (customError?.status && customError.body?.data) {
            Object.entries(customError.body.data).forEach(([key, message]) => {
               setError(key as keyof SigninFormValues, {
                  type: "server",
                  message: String(message),
               });
            });
         } else {
            console.error("예상치 못한 에러: ", customError?.body?.message);
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex w-full flex-col gap-4"
      >
         <AuthInput<SigninFormValues>
            name="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            register={register}
            error={errors.email?.message}
         />
         <PasswordInput<SigninFormValues>
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register}
            error={errors.password?.message}
         />

         {/* 로그인 버튼 */}
         <section className="mt-4 lg:mt-10">
            <SolidButton disabled={!isValid || isLoading} type="submit">
               {isLoading ? "로딩 중..." : "로그인"}
            </SolidButton>
            <div className="mt-4 flex items-center justify-center gap-1 lg:mt-8 lg:gap-2">
               <p className="text-black-100 text-12-regular lg:text-20-regular">
                  아직 무빙 회원이 아니신가요?
               </p>
               <Link
                  href="/sign-up/mover"
                  className="text-primary-blue-300 text-12-semibold lg:text-20-semibold underline"
               >
                  이메일로 회원가입하기
               </Link>
            </div>
         </section>
      </form>
   );
}
