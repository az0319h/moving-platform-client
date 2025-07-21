import { useState } from "react";
import { useRouter } from "next/navigation";

type ErrorText = Record<string, string>;

export default function useClientLoginForm() {
   const router = useRouter();
   const [values, setValues] = useState({
      email: "",
      password: "",
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
