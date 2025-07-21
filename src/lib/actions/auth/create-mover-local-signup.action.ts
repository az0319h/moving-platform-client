"use server";

import { defaultFetch } from "@/lib/api/fetch-client";
import { AuthActionResult } from "@/lib/types/auth.types";
import isFetchError from "@/lib/utils/fetch-error.util";
import { signUpFormSchema } from "@/lib/schemas/auth.schemas";

export default async function createMoverLocalSignupAction(
   _: AuthActionResult | null,
   formData: FormData,
): Promise<AuthActionResult> {
   try {
      const rawFormData = {
         name: formData.get("name")?.toString() ?? "",
         email: formData.get("email")?.toString() ?? "",
         phone: formData.get("phone")?.toString() ?? "",
         password: formData.get("password")?.toString() ?? "",
         passwordConfirmation:
            formData.get("passwordConfirmation")?.toString() ?? "",
      };

      // 유효성 검사
      const validationResult = signUpFormSchema.safeParse(rawFormData);

      if (!validationResult.success) {
         const errors = validationResult.error.flatten().fieldErrors;
         return {
            success: false,
            fieldErrors: Object.fromEntries(
               Object.entries(errors).map(([key, value]) => [
                  key,
                  Array.isArray(value) ? value[0] : value,
               ]),
            ),
         };
      }

      // 백엔드 연동
      const response = await defaultFetch("/auth/signup/mover", {
         method: "POST",
         body: JSON.stringify(validationResult.data),
      });

      return {
         success: true,
         accessToken: response.data.accessToken,
         user: response.data.user,
      };
   } catch (error: unknown) {
      console.error("회원가입 실패 원인: ", error);

      // ✅ BE 오류 받음 (이메일, 전화번호 중복)
      if (isFetchError(error)) {
         const { data } = error.body;

         // 객체 형태라 data 형태로 오류 반환 (문자면 위에서 message를 받음)
         if (data && typeof data === "object") {
            return {
               success: false,
               fieldErrors: data as Record<string, string>,
            };
         }
      }

      return {
         success: false,
         globalError: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      };
   }
}
