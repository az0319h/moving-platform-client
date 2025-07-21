"use client";

import React, { useState } from "react";
import ErrorText from "./ErrorText";
import Image from "next/image";
import openedEye from "@/assets/images/visibilityIcon.svg";
import closedEye from "@/assets/images/visibilityOffIcon.svg";

interface Props {
   name: string;
   label: string;
   placeholder: string;
   value: string;
   onChange: (key: string, value: string) => void;
   error?: string;
}

export default function PasswordInput({
   name,
   label,
   value,
   placeholder,
   onChange,
   error,
}: Props) {
   // 아이콘으로 비밀번호 <-> 글자 처리
   const [isVisible, setIsVisible] = useState(false);

   const toggleEyeIcon = () => setIsVisible((prev) => !prev);

   return (
      <section className="flex w-full flex-col gap-2 lg:gap-4">
         <label htmlFor={name}>{label}</label>

         <div className="relative w-full">
            {/* 입력창 */}
            <input
               type={isVisible ? "text" : "password"}
               name={name}
               value={value}
               placeholder={placeholder}
               onChange={(e) => onChange(name, e.target.value)}
               className={`${error ? "border-secondary-red-200 focus:border-secondary-red-200" : "border-line-200 focus:border-primary-blue-300"} text-black-400 h-14 w-full rounded-2xl border bg-white p-3.5 lg:h-16`}
            />
            {/* 눈 아이콘 */}
            <button
               type="button"
               onClick={toggleEyeIcon}
               className="absolute top-1/2 right-3 -translate-y-1/2"
            >
               <Image
                  src={isVisible ? openedEye : closedEye}
                  alt="비밀번호 토글 아이콘"
                  width={24}
                  height={24}
               />
            </button>
         </div>

         {error && <ErrorText error={error} />}
      </section>
   );
}
