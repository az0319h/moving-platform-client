"use client";

import React, { useState } from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthFetchError, SignupFormValues } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/validations/auth.schemas";
import { defaultFetch } from "@/lib/api/fetch-client";

export default function MoverSignUpForm() {
   const router = useRouter();
   const { login } = useAuth();
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
            login(res.data.user, res.data.accessToken);
            router.push("/profile/create"); //TODO: 프로필로 이동하도록 수정해야함
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

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex w-full flex-col gap-4"
      >
         <AuthInput<SignupFormValues>
            name="name"
            label="이름"
            type="text"
            placeholder="성함을 입력해 주세요"
            register={register}
            error={errors.name?.message}
         />
         <AuthInput<SignupFormValues>
            name="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            register={register}
            error={errors.email?.message}
         />
         <AuthInput<SignupFormValues>
            name="phone"
            label="전화번호"
            type="text"
            placeholder="숫자만 입력해 주세요"
            register={register}
            error={errors.phone?.message}
         />
         <PasswordInput<SignupFormValues>
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register}
            error={errors.password?.message}
         />
         <PasswordInput<SignupFormValues>
            name="passwordConfirmation"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            register={register}
            error={errors.passwordConfirmation?.message}
         />

         <section className="mt-4 lg:mt-10">
            <SolidButton type="submit" disabled={!isValid || isLoading}>
               {isLoading ? "로딩 중..." : "시작하기"}
            </SolidButton>
            <div className="mt-4 flex items-center justify-center gap-1 lg:mt-8 lg:gap-2">
               <p className="text-black-100 text-12-regular lg:text-20-regular">
                  이미 무빙 회원이신가요?
               </p>
               <Link
                  href="/sign-in/mover"
                  className="text-primary-blue-300 text-12-semibold lg:text-20-semibold underline"
               >
                  로그인
               </Link>
            </div>
         </section>
      </form>
   );
}
