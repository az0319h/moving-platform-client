import React from "react";
import ProfileFieldButton from "./ProfileFieldButton";
import ClientProfileTitle from "./ClientProfileTitle";
import ProfileInput from "./ProfileInput";
import SolidButton from "@/components/common/SolidButton";
import { moveType, regions } from "@/constants";
import useClientProfileUpdateForm from "@/lib/hooks/useClientProfileUpdateForm";
import ProfilePasswordInput from "./ProfilePasswordInput";
import ProfileImage from "./ProfileImage";
import OutlinedButton from "@/components/common/OutlinedButton";
import { ClientProfileUpdateValue } from "@/lib/schemas";

export default function ClientProfileUpdateForm() {
   // ✅ 함수 모음
   const {
      register,
      errors,
      isValid,
      isLoading,
      selectedServices,
      selectedRegions,
      handleServiceToggle,
      handleRegionToggle,
      onSubmit,
      handleSubmit,
   } = useClientProfileUpdateForm();

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="flex flex-col lg:flex-row lg:justify-baseline lg:gap-14">
            {/* ✅ 입력창 모음 */}
            <div className="flex-1">
               <ProfileInput<ClientProfileUpdateValue>
                  type="text"
                  label="이름"
                  name="name"
                  placeholder="김코드"
                  register={register}
                  error={errors.name?.message}
               />
               <hr className="border-line-100 my-5 lg:my-8 lg:w-160" />
               <ProfileInput<ClientProfileUpdateValue>
                  type="email"
                  label="이메일"
                  name="email"
                  placeholder="codeit@email.com"
                  register={register}
                  error={errors.email?.message}
               />
               <hr className="border-line-100 my-5 lg:my-8 lg:w-160" />
               <ProfileInput<ClientProfileUpdateValue>
                  type="text"
                  label="전화번호"
                  name="phone"
                  placeholder="숫자만 입력해 주세요."
                  register={register}
                  error={errors.phone?.message}
               />
               <hr className="border-line-100 my-5 lg:my-8 lg:w-160" />
               <ProfilePasswordInput<ClientProfileUpdateValue>
                  label="현재 비밀번호"
                  name="password"
                  placeholder="현재 비밀번호를 입력해 주세요."
                  register={register}
                  error={errors.password?.message}
               />
               <hr className="border-line-100 my-5 lg:my-8 lg:w-160" />
               <ProfilePasswordInput<ClientProfileUpdateValue>
                  label="새 비밀번호"
                  name="newPassword"
                  placeholder="현재 비밀번호를 입력해 주세요."
                  register={register}
                  error={errors.newPassword?.message}
               />
               <hr className="border-line-100 my-5 lg:my-8 lg:w-160" />
               <ProfilePasswordInput<ClientProfileUpdateValue>
                  label="새 비밀번호 확인"
                  name="newPasswordConfirmation"
                  placeholder="새 비밀번호를 다시 한번 입력해 주세요."
                  register={register}
                  error={errors.newPasswordConfirmation?.message}
               />
            </div>

            <hr className="border-line-100 my-5 lg:my-8 lg:hidden" />

            <div className="flex-1">
               {/* ✅ 프로필 이미지 */}
               <ProfileImage />

               <hr className="border-line-100 my-5 lg:my-8 lg:w-160" />

               {/* ✅ 이용 서비스 */}
               <section>
                  <ClientProfileTitle type="서비스" />

                  {moveType.map((service) => (
                     <ProfileFieldButton
                        category="서비스"
                        name="serviceType"
                        key={service}
                        value={service}
                        isSelected={selectedServices.includes(service)}
                        onClick={() => handleServiceToggle(service)}
                     >
                        {service}
                     </ProfileFieldButton>
                  ))}
               </section>

               <hr className="border-line-100 mb-5 lg:mb-8 lg:w-160" />

               {/* ✅ 내가 사는 지역 */}
               <section className="mb-8 lg:mb-14">
                  <ClientProfileTitle type="지역" />

                  <div className="grid w-70 grid-cols-5 gap-x-2 gap-y-3 lg:w-104 lg:gap-x-3.5 lg:gap-y-4.5">
                     {regions.map((region) => (
                        <ProfileFieldButton
                           category="지역"
                           name="livingArea"
                           key={region}
                           value={region}
                           isSelected={selectedRegions.includes(region)}
                           onClick={() => handleRegionToggle(region)}
                        >
                           {region}
                        </ProfileFieldButton>
                     ))}
                  </div>
               </section>
            </div>
         </div>

         {/* ✅ 제출 버튼 */}
         <section className="flex w-full flex-col gap-2 lg:flex-row lg:justify-between lg:gap-4">
            <SolidButton
               type="submit"
               disabled={isLoading || !isValid}
               className="max-w-165 lg:w-auto lg:flex-1"
            >
               {isLoading ? "로딩 중..." : "수정하기"}
            </SolidButton>
            <OutlinedButton
               type="reset"
               className="max-w-165 !border-gray-200 !text-gray-200 lg:w-auto lg:flex-1"
            >
               취소
            </OutlinedButton>
         </section>
      </form>
   );
}
