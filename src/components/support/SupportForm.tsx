"use client";
import {
   supportContentValidate,
   supportEmailValidate,
   supportFileValidate,
   supportNameValidate,
   supportPhoneValidate,
   supportTitleValidate,
} from "@/lib/schemas";
import SupportInput from "./common/SupportInput";
import SupportSubmitButton from "./common/SupportSubmitButton";
import { createSupport } from "@/lib/actions/support/support.action";
import { useActionState, useEffect, useState } from "react";
import ResultModal from "../common/modal/ResultModal";

// 문의 폼 전체 컴포넌트
export default function SupportForm() {
   // form 제출 후 응답 상태 관리: state에는 서버 응답, formData는 action, isPending은 로딩 상태
   const [state, formData, isPending] = useActionState(createSupport, null);

   // 모달 메시지 상태
   const [modalMessage, setModalMessage] = useState<string | null>(null);

   // 각 필드 유효성 검사 상태 (true면 유효)
   const [validationStates, setValidationStates] = useState<
      Record<string, boolean>
   >({
      name: false,
      email: false,
      title: false,
      number: true,
      content: false,
      file: true,
   });

   // 각 인풋 필드에서 유효성 상태 업데이트
   const handleValidationUpdate = (name: string, isValied: boolean) => {
      setValidationStates((prev) => ({ ...prev, [name]: isValied }));
   };

   // 모달 닫기 핸들러
   const handleClose = () => {
      setModalMessage(null);
      window.location.reload();
   };

   // 전체 폼 유효 여부 확인
   const isFormValid = Object.values(validationStates).every(Boolean);

   // state가 갱신되면 모달 메시지 업데이트
   useEffect(() => {
      if (!state) return;

      setModalMessage(state.message);
   }, [isPending, state]);

   return (
      <>
         {/* 전송 결과 모달 */}
         {modalMessage && (
            <ResultModal
               isOpen={!!modalMessage}
               message={modalMessage}
               onClose={handleClose}
            />
         )}

         {/* 지원 폼 */}
         <form
            action={formData}
            onKeyDown={(e) => {
               if (e.key === "Enter") e.preventDefault();
            }}
            className="mt-4 flex w-full flex-col md:mt-6"
         >
            <div className="md:flex md:gap-10 lg:gap-20">
               <SupportInput
                  name="name"
                  label="작성자 성함"
                  important={true}
                  validate={supportNameValidate}
                  setValidationState={handleValidationUpdate}
               />
               <SupportInput
                  name="email"
                  label="이메일"
                  important={true}
                  validate={supportEmailValidate}
                  setValidationState={handleValidationUpdate}
               />
            </div>
            <div className="md:flex md:gap-10 lg:gap-20">
               <SupportInput
                  name="title"
                  label="글제목"
                  important={true}
                  validate={supportTitleValidate}
                  setValidationState={handleValidationUpdate}
               />
               <SupportInput
                  name="number"
                  label="연락처"
                  important={false}
                  validate={supportPhoneValidate}
                  setValidationState={handleValidationUpdate}
               />
            </div>
            <div>
               <SupportInput
                  name="content"
                  label="문의내용"
                  important={true}
                  textarea={true}
                  validate={supportContentValidate}
                  setValidationState={handleValidationUpdate}
               />
               <SupportInput
                  name="file"
                  label="첨부파일업로드"
                  important={false}
                  fileupload={true}
                  fileValidate={supportFileValidate}
                  setValidationState={handleValidationUpdate}
               />
            </div>
            <div
               className={`mt-4 flex justify-center transition-opacity duration-500 ease-in-out md:mt-6 ${isFormValid ? "opacity-100" : "pointer-events-none opacity-0"} `}
            >
               <SupportSubmitButton isPending={isPending} />
            </div>
         </form>
      </>
   );
}
