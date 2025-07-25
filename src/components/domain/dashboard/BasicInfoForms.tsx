"use client";

import React, { useEffect, useState } from "react";
import BasicInputField from "./BasicInputField";
import SecretInputField from "./SecretInputField";
import { useRouter } from "next/navigation";
import useMoverBasicInfo from "@/lib/hooks/useMoverBasicInfo";
import { MoverBasicInfoInput } from "@/lib/schemas/dashboard.schema";
import SolidButton from "@/components/common/SolidButton";
import OutlinedButton from "@/components/common/OutlinedButton";
import { useAuth } from "@/context/AuthContext";

export default function BasicInfoForms() {
   const router = useRouter();
   const { user } = useAuth();
   const [isSocial, setIsSocial] = useState(false); // 소셜 인증자들에겐 다른 UI를 보여줌

   const { register, errors, isValid, isLoading, handleSubmit, onSubmit } =
      useMoverBasicInfo();

   useEffect(() => {
      // 소셜 인증자들에겐 다른 UI를 보여줌 (= 비밀번호 input 3개 안보이게)
      if (!user?.name || !user?.phone) {
         setIsSocial(true);
      }
   }, [user]);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="flex flex-col lg:flex-row lg:gap-18">
            <div className="flex-1">
               <BasicInputField<MoverBasicInfoInput>
                  name="name"
                  text="이름"
                  placeholder="사이트에 노출될 본명을 입력해주세요"
                  register={register}
                  error={errors.name?.message}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <BasicInputField<MoverBasicInfoInput>
                  name="email"
                  text="이메일"
                  placeholder="moving.@email.com"
                  register={register}
                  error={errors.email?.message}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <BasicInputField<MoverBasicInfoInput>
                  name="phone"
                  text="전화번호"
                  placeholder="01012345678"
                  register={register}
                  error={errors.phone?.message}
               />
            </div>

            <hr className="p-o border-line-100 my-8 border-t lg:hidden" />

            <div className="flex-1">
               {!isSocial ? (
                  <>
                     <SecretInputField<MoverBasicInfoInput>
                        name="existedPassword"
                        text="현재 비밀번호"
                        placeholder="현재 비밀번호를 입력해주세요"
                        register={register}
                        error={errors.existedPassword?.message}
                     />

                     <hr className="p-o border-line-100 my-8 border-t" />
                  </>
               ) : null}

               <SecretInputField<MoverBasicInfoInput>
                  name="newPassword"
                  text="새 비밀번호"
                  placeholder="새 비밀번호를 입력해주세요"
                  register={register}
                  error={errors.newPassword?.message}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <SecretInputField<MoverBasicInfoInput>
                  name="newPasswordConfirmation"
                  text="새 비밀번호 확인"
                  placeholder="새 비밀번호를 다시 한번 입력해주세요"
                  register={register}
                  error={errors.newPasswordConfirmation?.message}
               />

               <hr className="p-o border-line-100 my-8 border-t lg:hidden" />
            </div>
         </div>

         <div className="flex flex-col gap-2 lg:mt-16 lg:flex-row-reverse lg:gap-8">
            <SolidButton disabled={!isValid || isLoading} type="submit">
               {isLoading ? "수정 중..." : isSocial ? "등록하기" : "수정하기"}
            </SolidButton>
            <OutlinedButton onClick={() => router.push("/dashboard")}>
               취소
            </OutlinedButton>
         </div>
      </form>
   );
}
