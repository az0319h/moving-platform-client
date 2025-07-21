"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tokenFetch } from "@/lib/api/fetch-client";
import {
   MoverBasicInfoInput,
   MoverBasicInfoSchema,
} from "@/lib/schemas/dashboard.schema";
import { AuthFetchError } from "@/lib/types/auth.types";
import BasicInputField from "./BasicInputField";
import SecretInputField from "./SecretInputField";
import SolidButton from "@/components/common/SolidButton";
import OutlinedButton from "@/components/common/OutlineButton";

export default function BasicInfoForms() {
   const { user } = useAuth();
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      setError,
   } = useForm<MoverBasicInfoInput>({
      resolver: zodResolver(MoverBasicInfoSchema),
      mode: "onChange",
      defaultValues: {
         name: user?.name || "",
         email: user?.email || "",
         phone: user?.phone || "",
         existedPassword: "",
         newPassword: "",
         newPasswordConfirmation: "",
      },
   });

   const onSubmit = async (data: MoverBasicInfoInput) => {
      setIsLoading(true);

      try {
         const res = await tokenFetch("/dashboard/edit/mover", {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (res.data.accessToken && res.data.user) {
            router.push("/dashboard"); //TODO: 수정사항 repatch
         }
      } catch (error) {
         console.error("기사님 기본정보 수정 실패:", error);

         const customError = error as AuthFetchError;

         if (customError?.status && customError.body?.data) {
            Object.entries(customError.body.data).forEach(([key, message]) => {
               setError(key as keyof MoverBasicInfoInput, {
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
               <SecretInputField<MoverBasicInfoInput>
                  name="existedPassword"
                  text="현재 비밀번호"
                  placeholder="현재 비밀번호를 입력해주세요"
                  register={register}
                  error={errors.existedPassword?.message}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

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
               {isLoading ? "수정 중..." : "수정하기"}
            </SolidButton>
            <OutlinedButton onClick={() => router.push("/dashboard")}>
               취소
            </OutlinedButton>
         </div>
      </form>
   );
}
