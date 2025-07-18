"use client";

import React from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SignupFormValues } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/validations/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import signupMover from "@/lib/api/authMover.api";

export default function MoverSignUpForm() {
   const router = useRouter();
   const { login } = useAuth();

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid },
   } = useForm<SignupFormValues>({
      resolver: zodResolver(signUpFormSchema),
      mode: "onChange",
   });

   const { mutate, isPending } = useMutation({
      mutationFn: signupMover, //fetch 보내는 api쪽 함수
      onSuccess: (data) => {
         if (data.success && data.accessToken && data.user) {
            login(data.user, data.accessToken);
            router.push("/profile/create");
         }
      },
      onError: (error) => {
         const customError = error as { fieldErrors?: Record<string, string> };

         if (customError?.fieldErrors) {
            Object.entries(customError.fieldErrors).forEach(
               ([key, message]) => {
                  setError(key as keyof SignupFormValues, {
                     type: "server",
                     message: String(message),
                  });
               },
            );
         }
      },
   });

   const onSubmit = (data: SignupFormValues) => {
      mutate(data);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex w-full flex-col gap-4"
      >
         <AuthInput
            name="name"
            label="이름"
            type="text"
            placeholder="성함을 입력해 주세요"
            register={register}
            error={errors.name?.message}
         />
         <AuthInput
            name="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            register={register}
            error={errors.email?.message}
         />
         <AuthInput
            name="phone"
            label="전화번호"
            type="text"
            placeholder="숫자만 입력해 주세요"
            register={register}
            error={errors.phone?.message}
         />
         <PasswordInput
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register}
            error={errors.password?.message}
         />
         <PasswordInput
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register}
            error={errors.password?.message}
         />

         <section className="mt-4 lg:mt-10">
            <SolidButton type="submit" disabled={!isValid || isPending}>
               {isPending ? "로딩 중..." : "시작하기"}
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
