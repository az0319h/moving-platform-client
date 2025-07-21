"use client";

import React from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SolidButton from "../common/buttons/SolidButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import useClientLoginForm from "@/lib/hooks/useClientLoginForm";

export default function ClientLoginForm() {
   // 상태 모음
   const { getUser } = useAuth();
   const { values, errorText, isPending, handleChange } = useClientLoginForm();

   // 본문
   return (
      <form className="flex w-full flex-col gap-4">
         <AuthInput
            type="email"
            name="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            value={values.email}
            onChange={handleChange}
            error={errorText.email}
         />
         <PasswordInput
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={values.password}
            onChange={handleChange}
            error={errorText.password}
         />

         {/* 로그인 버튼 */}
         <section className="mt-4 lg:mt-10">
            <SolidButton disabled type="submit">
               {isPending ? "로딩 중..." : "로그인"}
            </SolidButton>
            <div className="mt-4 flex items-center justify-center gap-1 lg:mt-8 lg:gap-2">
               <p className="text-black-100 text-12-regular lg:text-20-regular">
                  아직 무빙 회원이 아니신가요?
               </p>
               <Link
                  href="/sign-up/client"
                  className="text-primary-blue-300 text-12-semibold lg:text-20-semibold underline"
               >
                  이메일로 회원가입하기
               </Link>
            </div>
         </section>
      </form>
   );
}
