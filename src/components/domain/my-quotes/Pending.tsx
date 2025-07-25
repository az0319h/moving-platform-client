"use client";

import React, { useEffect, useState } from "react";
import profile from "@/assets/images/profileIcon.svg";
import { useRouter } from "next/navigation";
import { ChipType } from "@/components/common/MoveChip";
import SolidButton from "@/components/common/SolidButton";
import OutlinedButton from "@/components/common/OutlinedButton";
import { Quotes } from "@/lib/types";
import { fetchClientPendingQuotes } from "@/lib/api/estimate/getClientPendingQuote";
import MoveDateCard from "./MoveDateCard";
import MoverProfileclient from "./MoverProfileClient";
import EmptyState from "@/components/common/EmptyState";
import { postClientConfirmedQuote } from "@/lib/api/estimate/postClientConfirmedQuote";
import ResultModal from "@/components/common/ResultModal";

export default function Pending() {
   const [data, setData] = useState<Quotes[]>();
   const [isModal, setIsModal] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      async function getMyPendingQuotes() {
         try {
            const result = await fetchClientPendingQuotes();
            setData(result.data);
         } catch (e) {
            console.log(e);
            throw e;
         }
      }

      getMyPendingQuotes();
   }, []);

   const handleClickConfirmed = async (estimateId: string) => {
      try {
         const result = await postClientConfirmedQuote(estimateId);

         setIsModal(true);
         return result;
      } catch (e) {
         throw e;
      }
   };

   const handleClickModal = () => {
      setIsModal(false);
      location.reload();
   };

   if (!Array.isArray(data) || data.length === 0)
      return <EmptyState message="기사님들이 열심히 확인 중이에요!" />;

   if (isModal)
      return (
         <ResultModal
            isOpen={isModal}
            message="견적이 확정 되었습니다."
            onClose={handleClickModal}
         />
      );

   return (
      <div className="text-black-300 flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10.5">
         {data.flatMap((request) =>
            request.estimates.map((estimate) => (
               <section
                  key={estimate.estimateId}
                  style={{
                     boxShadow:
                        "-2px -2px 10px rgba(220, 220, 220, 0.2), 2px 2px 10px rgba(220, 220, 220, 0.2)",
                  }}
                  className="mx-auto flex w-full flex-col gap-2 rounded-2xl bg-white px-3 pt-5 pb-3.5 lg:mx-0 lg:w-172 lg:px-6 lg:pt-7 lg:pb-5.5"
               >
                  <div className="flex flex-col gap-3.5">
                     <MoverProfileclient
                        moveType={request.moveType as ChipType}
                        isDesignated={estimate.isDesignated}
                        moverName={estimate.moverName}
                        profileImage={estimate.profileImage || profile}
                        isFavorited={!!estimate.isFavorited}
                        handleLikedClick={() => console.log("찜 토글")}
                        averageReviewRating={estimate.reviewRating}
                        reviewCount={estimate.reviewCount}
                        career={estimate.career | 0}
                        estimateCount={estimate.estimateCount}
                        favoriteCount={estimate.favoriteCount}
                        quotesStatus="pending"
                     />
                     <MoveDateCard
                        category="이사일"
                        text={new Date(request.moveDate).toLocaleDateString()}
                     />
                     <article className="flex items-center gap-3.5">
                        <MoveDateCard
                           category="출발"
                           text={request.fromAddress}
                        />
                        <div className="bg-line-200 h-3.5 w-px" />
                        <MoveDateCard
                           category="도착"
                           text={request.toAddress}
                        />
                     </article>
                  </div>
                  <div>
                     <p className="text-14-medium text-black-400 text-right">
                        견적 금액{" "}
                        <span className="text-18-bold">
                           {estimate.price.toLocaleString()}원
                        </span>
                     </p>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                     <SolidButton
                        onClick={() =>
                           handleClickConfirmed(estimate.estimateId)
                        }
                     >
                        견적 확정하기
                     </SolidButton>
                     <OutlinedButton
                        onClick={() =>
                           router.push(`client/${estimate.estimateId}`)
                        }
                     >
                        상세보기
                     </OutlinedButton>
                  </div>
               </section>
            )),
         )}
      </div>
   );
}
