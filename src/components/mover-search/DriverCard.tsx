"use client";

import { useRouter } from "next/navigation";
import MoverProfile from "@/components/common/profile/MoverProfile";
import MoveChip from "@/components/common/chips/MoveChip";
import { useMover } from "@/context/MoverContext";

import { tokenSettings } from "@/lib/utils/auth.util";
import type { Mover } from "@/lib/types/mover.types";
import { validateServiceTypes } from "@/lib/utils/moveChip.util";

interface DriverCardProps {
   mover: Mover;
}

export default function DriverCard({ mover }: DriverCardProps) {
   const { toggleFavorite } = useMover();
   const router = useRouter();

   const handleCardClick = () => {
      router.push(`/mover-search/${mover.id}`);
   };

   const handleLikedClick = async (e: React.MouseEvent) => {
      e.stopPropagation(); // ✅ 클릭 전파 방지

      const token = tokenSettings.get();
      if (!token) {
         alert("로그인이 필요합니다.");
         return;
      }
      await toggleFavorite(mover.id, token as string);
   };

   const validServiceTypes = validateServiceTypes(mover.serviceType!);

   return (
      <div
         onClick={handleCardClick}
         className="flex h-48 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-50 bg-white shadow-sm transition hover:shadow-md lg:h-56 lg:px-5"
      >
         <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
               {validServiceTypes.map((type) => (
                  <MoveChip key={type} type={type} mini={false} />
               ))}
            </div>

            <p className="text-14-semibold md:text-14-semibold lg:text-24-semibold mb-3 text-gray-700">
               {mover.description ||
                  "고객님의 물품을 안전하게 운송해 드립니다."}
            </p>

            <div className="box-border h-20 w-72 md:w-[34rem] lg:h-24 lg:w-[56rem]">
               <MoverProfile
                  big={false}
                  isLiked={mover.isFavorite || false}
                  handleLikedClick={handleLikedClick}
                  nickName={mover.nickName}
                  favoriteCount={mover.favoriteCount}
                  averageReviewRating={mover.averageReviewRating}
                  reviewCount={mover.reviewCount}
                  career={mover.career}
                  estimateCount={mover.estimateCount}
                  profileImage={mover.profileImage}
               />
            </div>
         </div>
      </div>
   );
}
