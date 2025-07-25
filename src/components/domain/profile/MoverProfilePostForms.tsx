"use client";

import useMoverProfilePostForm from "@/lib/hooks/useMoverProfilePostForm";
import React from "react";
import ImageInputField from "./ImageInputField";
import GeneralInputField from "./GeneralInputField";
import TextAreaInputField from "./TextAreaInputField";
import ButtonInputField from "./ButtonInputField";
import SolidButton from "@/components/common/SolidButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MoverProfilePostForm() {
   const { user } = useAuth();
   const router = useRouter();

   //(소셜 로그인의 경우) 기본정보가 없을 수 있어서 리다이렉트 (실명, 전화번호가 nullable임)
   if (!user?.phone) {
      alert("이름과 전화번호는 필수 정보입니다. 기본정보 작성을 완료해주세요"); //TODO: 토스트 알람으로 리펙터링
      router.push("/dashboard/edit-account");
   }

   //프로필 등록을 이미 한 유저의 경우 프로필 수정으로 리다이렉트
   if (user?.isProfileCompleted) {
      alert("이미 프로필이 등록되어 있습니다"); //TODO: 토스트 알람으로 리펙터링
      router.push("/profile/edit");
   }

   const {
      register,
      control,
      errors,
      isValid,
      isLoading,
      handleSubmit,
      onSubmit,
   } = useMoverProfilePostForm();

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="mt-6 flex w-full flex-col lg:mt-12"
      >
         <div className="flex flex-col lg:flex-row lg:gap-18">
            <div className="flex flex-1 flex-col">
               <ImageInputField
                  name="image"
                  text="프로필 이미지"
                  control={control}
                  error={errors.image}
               />

               <hr className="border-line-100 m-0 my-8 hidden border-t p-0 lg:block" />

               <div className="mt-8">
                  <GeneralInputField
                     name="nickName"
                     text="별명"
                     placeholder="사이트에 노출될 이름을 입력해주세요"
                     register={register}
                     error={errors.nickName}
                  />
               </div>

               <hr className="border-line-100 m-0 my-8 border-t p-0" />

               <GeneralInputField
                  name="career"
                  text="경력"
                  placeholder="기사님의 경력을 입력해주세요"
                  register={register}
                  error={errors.career}
               />

               <hr className="border-line-100 m-0 my-8 border-t p-0" />

               <GeneralInputField
                  name="introduction"
                  text="한 줄 소개"
                  placeholder="한 줄 소개를 입력해주세요"
                  register={register}
                  error={errors.introduction}
               />

               <hr className="border-line-100 m-0 my-8 border-t p-0 lg:hidden" />
            </div>

            <div className="flex-1">
               <TextAreaInputField
                  name="description"
                  text="상세 설명"
                  placeholder="상세 내용을 입력해주세요"
                  register={register}
                  error={errors.description}
               />

               <hr className="border-line-100 m-0 my-8 border-t p-0" />

               <ButtonInputField
                  name="serviceType"
                  text="제공 서비스"
                  isServiceType={true}
                  control={control}
                  error={
                     Array.isArray(errors.serviceType)
                        ? errors.serviceType[0]
                        : errors.serviceType
                  }
               />

               <hr className="border-line-100 m-0 my-8 border-t p-0" />

               <ButtonInputField
                  name="serviceArea"
                  text="서비스 가능 지역"
                  isArea={true}
                  control={control}
                  error={
                     Array.isArray(errors.serviceArea)
                        ? errors.serviceArea[0]
                        : errors.serviceArea
                  }
               />
            </div>
         </div>

         <div className="mt-17 lg:pl-185">
            <SolidButton disabled={!isValid || isLoading} type="submit">
               {isLoading ? "등록 중..." : "시작하기"}
            </SolidButton>
         </div>
      </form>
   );
}
