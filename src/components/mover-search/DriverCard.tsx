'use client';

import { useRouter } from 'next/navigation';
import MoverProfile from '@/components/common/profile/MoverProfile';
import MoveChip from '@/components/common/chips/MoveChip';
import { useMover } from '@/context/MoverContext';
import { validateServiceTypes } from '@/lib/utils/moveChip.utils';
import { accessTokenSettings } from '@/lib/utils/auth.util';
import type { Mover } from '@/lib/types/mover.types';

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

  const token = accessTokenSettings.get();
  if (!token) {
    alert('로그인이 필요합니다.');
    return;
  }
  await toggleFavorite(mover.id, token);
};

  const validServiceTypes = validateServiceTypes(mover.serviceType);

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer flex items-center justify-center w-full h-48 lg:px-5 lg:h-56 bg-white rounded-xl border border-gray-50 shadow-sm hover:shadow-md transition"
    >
      <div className="flex flex-col">
        <div className="flex items-center mb-2 gap-2">
          {validServiceTypes.map((type) => (
            <MoveChip key={type} type={type} mini={false} />
          ))}
        </div>

        <p className="text-14-semibold md:text-14-semibold lg:text-24-semibold text-gray-700 mb-3">
          {mover.description || '고객님의 물품을 안전하게 운송해 드립니다.'}
        </p>

        <div className="w-72 h-20 md:w-[34rem] lg:w-[56rem] lg:h-24 box-border">
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
