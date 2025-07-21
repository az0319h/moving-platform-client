import { FieldValues, Path, UseFormRegister } from "react-hook-form";

//기사님 기본정보 컴포넌트 모음집
export interface BasicInfoInputProps<T extends FieldValues> {
   name: Path<T>;
   text: string;
   placeholder: string;
   register: UseFormRegister<T>;
   error?: string;
}
