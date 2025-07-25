"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

function BasicInfoFormsTitle() {
   const { user } = useAuth();
   const [title, setTitle] = useState("수정");

   // 소셜 인증자는 첫 "등록", 로컬 인증자는 정보 "수정"
   useEffect(() => {
      if (!user?.name || !user?.phone) {
         setTitle("등록");
      } else {
         setTitle("수정");
      }
   }, [user]);

   return (
      <div className="mb-6 flex flex-col gap-4 lg:mb-12 lg:gap-8">
         <div className="text-18-semibold lg:text-32-semibold leading-8">
            {`기본정보 ${title}`}
         </div>
      </div>
   );
}

export default BasicInfoFormsTitle;
