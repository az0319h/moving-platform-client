"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpFields } from "../types";

// ✅ 타입 정의
type ErrorText = Record<string, string>;

export default function useClientSignUpForm() {
   // 상태 모음
   const router = useRouter();
   const [values, setValues] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
   });
   const [errorText, setErrorText] = useState<Partial<ErrorText>>({});
   const [isPending, setIsPending] = useState(false);

   const handleChange = (key: string, value: string) => {
      setValues((prev) => ({ ...prev, [key]: value }));

      // 글자 입력하면 오류 메시지 초기화
      if (errorText[key]) {
         setErrorText((prev) => ({ ...prev, [key]: "" }));
      }
   };

   return {
      values,
      errorText,
      isPending,

      handleChange,
   };
}
