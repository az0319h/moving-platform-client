"use client";

import React from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";
import { SignupFormValues } from "@/lib/types";
import useMoverSignUpForm from "@/lib/hooks/useMoverSignUpForm";

export default function MoverSignUpForm() {
   const { register, errors, isValid, isLoading, handleSubmit, onSubmit } =
      useMoverSignUpForm();

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
