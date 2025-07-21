"use client";

import React from "react";
import ErrorText from "./ErrorText";

interface Props {
   type?: "text" | "email";
   name: string;
   label: string;
   placeholder: string;
   value: string;
   onChange: (key: string, value: string) => void;
   error?: string;
}

export default function AuthInput({
   type = "text",
   name,
   label,
   placeholder,
   value,
   onChange,
   error,
}: Props) {
   return (
      <section className="flex w-full flex-col gap-2 lg:gap-4">
         <label htmlFor={name}>{label}</label>
         <input
            type={type}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${error ? "border-secondary-red-200 focus:border-secondary-red-200" : "border-line-200 focus:border-primary-blue-300"} text-black-400 h-14 rounded-2xl border bg-white p-3.5 lg:h-16`}
         />

         {error && <ErrorText error={error} />}
      </section>
   );
}
