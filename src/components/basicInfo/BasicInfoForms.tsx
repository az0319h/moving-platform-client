"use client";

import React, { useActionState, useEffect, useState } from "react";
import BasicInputField from "./BasicInputField";
import SolidButton from "../common/buttons/SolidButton";
import OutlinedButton from "../common/buttons/OutlinedButton";
import SecretInputField from "./SecretInputField";
import { useRouter } from "next/navigation";
import { updateMoverBasicInfo } from "@/lib/actions/mover/update-mover-basicInfo.action";
import {
   validateCheckNewPassword,
   validateEmail,
   validateExistedPassword,
   validateNewPassword,
   validatePhone,
   validateName,
} from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";

export default function BasicInfoForms() {
   const { user } = useAuth();
   const router = useRouter();

   const [newPassword, setNewPassword] = useState(""); //비밀번호 대조를 위한 상태 관리

   const [formState, formAction, isPending] = useActionState(
      updateMoverBasicInfo,
      null,
   );

   //현재 로그인한 유저의 데이터를 미리 입력
   const [formValues, setFormValues] = useState({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "", //추후 추가 예정
   });

   //주석: 수정하기 버튼 활성화를 위한 상태 관리
   const [updateValidity, setUpdateValidity] = useState<
      Record<string, boolean>
   >({
      name: true, // DB 값을 불러오는 거라서 true 처리함
      email: true, // DB 값을 불러오는 거라서 true 처리함
      phone: true, // DB 값을 불러오는 거라서 true 처리함
      existedPassword: false,
      newPassword: false,
      checkNewPassword: false,
   });

   const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
   };

   //주석: 수정하기 버튼 활성화를 위해 InputField 컴포넌트로 내려줄 함수
   const handleValidityChange = (key: string, isValid: boolean) => {
      setUpdateValidity((prev) => ({
         ...prev,
         [key]: isValid,
      }));
   };

   //주석: 수정하기 버튼 활성화
   const isDisabled =
      isPending || !Object.values(updateValidity).every((v) => v === true);

   //서버액션 성공 시 마이페이지로 리다이렉트
   useEffect(() => {
      if (formState?.success) {
         // setUser(formState?.user!); //추후에 로직 추가해야함
         router.push("/dashboard");
      }
   }, [formState, router]);

   return (
      <form action={formAction}>
         <div className="flex flex-col lg:flex-row lg:gap-18">
            <div className="flex-1">
               <BasicInputField
                  name="name"
                  text="이름"
                  placeholder="사이트에 노출될 본명을 입력해주세요"
                  validator={validateName}
                  onValidChange={handleValidityChange}
                  existedValue={formValues.name}
                  onValueChange={(key, val) =>
                     setFormValues((prev) => ({ ...prev, [key]: val }))
                  }
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <BasicInputField
                  name="email"
                  text="이메일"
                  placeholder="moving.@email.com"
                  validator={validateEmail}
                  onValidChange={handleValidityChange}
                  existedValue={formValues.email}
                  onValueChange={(key, val) =>
                     setFormValues((prev) => ({ ...prev, [key]: val }))
                  }
                  serverError={formState?.fieldErrors?.email}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <BasicInputField
                  name="phone"
                  text="전화번호"
                  placeholder="01012345678"
                  validator={validatePhone}
                  onValidChange={handleValidityChange}
                  existedValue={formValues.phone}
                  onValueChange={(key, val) =>
                     setFormValues((prev) => ({ ...prev, [key]: val }))
                  }
                  serverError={formState?.fieldErrors?.phone}
               />
            </div>

            <hr className="p-o border-line-100 my-8 border-t lg:hidden" />

            <div className="flex-1">
               <SecretInputField
                  name="existedPassword"
                  text="현재 비밀번호"
                  placeholder="현재 비밀번호를 입력해주세요"
                  validator={validateExistedPassword}
                  onValidChange={handleValidityChange}
                  serverError={formState?.fieldErrors?.existedPassword}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <SecretInputField
                  name="newPassword"
                  text="새 비밀번호"
                  placeholder="새 비밀번호를 입력해주세요"
                  validator={validateNewPassword}
                  onValidChange={handleValidityChange}
                  onChange={handleNewPasswordChange}
               />

               <hr className="p-o border-line-100 my-8 border-t" />

               <SecretInputField
                  name="checkNewPassword"
                  text="새 비밀번호 확인"
                  placeholder="새 비밀번호를 다시 한번 입력해주세요"
                  validator={(val) =>
                     validateCheckNewPassword(val, newPassword)
                  }
                  onValidChange={handleValidityChange}
               />

               <hr className="p-o border-line-100 my-8 border-t lg:hidden" />
            </div>
         </div>

         <div className="flex flex-col gap-2 lg:mt-16 lg:flex-row-reverse lg:gap-8">
            <SolidButton disabled={isDisabled} type="submit">
               수정하기
            </SolidButton>
            <OutlinedButton onClick={() => router.push("/dashboard")}>
               취소
            </OutlinedButton>
         </div>
      </form>
   );
}
