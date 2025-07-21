import { FieldValues, Path, UseFormRegister } from "react-hook-form";

//기사님 기본정보 컴포넌트 모음집
export interface BasicInfoInputProps<T extends FieldValues> {
   name: Path<T>;
   text: string;
   placeholder: string;
   // defaultValue?: string;  //디버깅
   // onValidChange: (name: string, value: boolean) => void;
   // validator: (value: string) => ValidationResult; // 유효성 검사 함수
   // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   // existedValue?: string;
   // onValueChange?: (name: string, newVal: string) => void;
   // serverError?: string;
   register: UseFormRegister<T>;
   error?: string;
}
