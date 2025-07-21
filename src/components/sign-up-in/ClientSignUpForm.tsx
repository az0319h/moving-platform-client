"use client";

import React from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";
import useClientSignUpForm from "@/lib/hooks/useClientSignUpForm";

// 여기서부터 시작
export default function ClientSignUpForm() {
   const { values, errorText, isPending, handleChange } = useClientSignUpForm();

   // ✅ 본문
   return (
      <form className="flex w-full flex-col gap-4">
         <AuthInput
            name="name"
            label="이름"
            value={values.name || ""}
            type="text"
            placeholder="성함을 입력해 주세요"
            onChange={handleChange}
            error={errorText.name || ""}
         />
         <AuthInput
            name="email"
            label="이메일"
            value={values.email || ""}
            type="email"
            placeholder="이메일을 입력해 주세요"
            onChange={handleChange}
            error={errorText.email || ""}
         />
         <AuthInput
            name="phone"
            label="전화번호"
            value={values.phone || ""}
            type="text"
            placeholder="숫자만 입력해 주세요"
            onChange={handleChange}
            error={errorText.phone || ""}
         />
         <PasswordInput
            name="password"
            label="비밀번호"
            value={values.password || ""}
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleChange}
            error={errorText.password || ""}
         />
         <PasswordInput
            name="passwordConfirmation"
            label="비밀번호 확인"
            value={values.passwordConfirmation || ""}
            placeholder="비밀번호를 다시 한번 입력해 주세요"
            onChange={handleChange}
            error={errorText.passwordConfirmation || ""}
         />

         {/* 회원가입 버튼 */}
         <section className="mt-4 lg:mt-10">
            <SolidButton type="submit" disabled>
               {isPending ? "로딩 중..." : "시작하기"}
            </SolidButton>
            <div className="mt-4 flex items-center justify-center gap-1 lg:mt-8 lg:gap-2">
               <p className="text-black-100 text-12-regular lg:text-20-regular">
                  이미 무빙 회원이신가요?
               </p>
               <Link
                  href="/sign-in/client"
                  className="text-primary-blue-300 text-12-semibold lg:text-20-semibold underline"
               >
                  로그인
               </Link>
            </div>
         </section>
      </form>
   );
}
