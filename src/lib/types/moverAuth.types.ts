import z from "zod";
import { signUpFormSchema } from "../validations/auth.schemas";

export interface MoverAuthProps {
   type: "login" | "signup";
}

//기사님 회원가입 시 react-hook-form에서 사용하는 제네릭
export type SignupFormValues = z.infer<typeof signUpFormSchema>;
