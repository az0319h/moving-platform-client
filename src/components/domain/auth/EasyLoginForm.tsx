"use client";

import React from "react";
import Image from "next/image";
import googleIcon from "@/assets/images/logoGoogle.svg";
import kakaoIcon from "@/assets/images/logoKakao.svg";
import naverIcon from "@/assets/images/logoNaver.svg";
import { BASE_URL, tokenSettings } from "@/lib/utils";

// 간편 로그인
export default function EasyLoginForm() {
   //TODO: 삭제 예정
   //    const handleGoogleLogin = () => {
   //       window.location.href = `${BASE_URL}/auth/google`;
   //    };

   // const handleKakaoleLogin = () => {
   //    window.location.href = `${BASE_URL}/auth/google`;
   // };

   // const handleNaverLogin = () => {
   //    window.location.href = `${BASE_URL}/auth/naver`;
   // };

   const openPopup = (provider: "google" | "kakao" | "naver") => {
      const popup = window.open(
         `${BASE_URL}/auth/${provider}`,
         "_blank",
         "width=500,height=600",
      );

      const handleMessage = (event: MessageEvent) => {
         if (event.origin !== BASE_URL) return;

         const { accessToken, refreshToken } = event.data;
         if (accessToken && refreshToken) {
            // 저장 후 리다이렉트
            // localStorage.setItem("accessToken", accessToken);
            // localStorage.setItem("refreshToken", refreshToken);
            tokenSettings.set(accessToken);
            window.location.href = "/profile/create";
         }

         // 리스너 제거 및 팝업 닫기
         window.removeEventListener("message", handleMessage);
         popup?.close();
      };

      window.addEventListener("message", handleMessage);
   };

   return (
      <section className="my-12 flex flex-col items-center gap-6 lg:my-18">
         <p className="text-black-100 text-12-regular lg:text-20-regular">
            SNS 계정으로 간편 가입하기
         </p>
         <div className="flex gap-6 lg:gap-8">
            <figure
               className="relative h-13 w-13 lg:h-18 lg:w-18"
               // onClick={handleGoogleLogin}
               onClick={() => openPopup("google")}
            >
               <Image src={googleIcon} alt="구글 로그인" fill />
            </figure>
            <figure
               className="relative h-13 w-13 lg:h-18 lg:w-18"
               // onClick={handleKakaoleLogin}
               onClick={() => openPopup("kakao")}
            >
               <Image src={kakaoIcon} alt="카카오 로그인" fill />
            </figure>
            <figure
               className="relative h-13 w-13 lg:h-18 lg:w-18"
               // onClick={handleNaverLogin}
               onClick={() => openPopup("naver")}
            >
               <Image src={naverIcon} alt="네이버 로그인" fill />
            </figure>
         </div>
      </section>
   );
}
