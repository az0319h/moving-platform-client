"use client";

import React from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";
import useMoverLoginForm from "@/lib/hooks/useMoverLoginForm";
import { SigninFormValues } from "@/lib/types";

export default function MoverLoginForm() {
   const { register, errors, isValid, onSubmit, isLoading, handleSubmit } =
      useMoverLoginForm();

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
