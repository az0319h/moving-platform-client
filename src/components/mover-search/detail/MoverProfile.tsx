// Profile section - responsive design
import { Mover, MoveType } from '@/lib/types/mover.types';
import heart from '@/assets/images/likeFilledIcon.svg';
import inActiveHeart from '@/assets/images/likeOutlineIcon.svg';
import star from '@/assets/images/starFilledIcon.svg';
import Image from 'next/image';

export default function MoverProfile({
  profileImage,
  nickName,
  favoriteCount,
  averageReviewRating,
  reviewCount,
  career,
  estimateCount,
  isFavorite,
}: Mover) {
  return (
    <div className="flex items-center bg-white border border-gray-100 rounded-lg p-3 lg:p-4 shadow-sm">
      <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-blue-500 mr-3 lg:mr-4 flex-shrink-0">
        <Image 
          src={profileImage || '/default-profile.png'} 
          alt="프로필" 
          fill 
          className="object-cover" 
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1 lg:mb-2">
          <span className="font-semibold text-sm lg:text-base text-gray-800 truncate">
            {nickName} 기사님
          </span>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Image 
              src={isFavorite ? heart : inActiveHeart} 
              width={16} 
              height={16} 
              alt="찜" 
              className="lg:w-5 lg:h-5"
            />
            <span className="text-xs lg:text-sm text-gray-600">{favoriteCount}</span>
          </div>
        </div>
        
        <div className="text-xs lg:text-sm text-gray-500 space-y-1 lg:space-y-0 lg:flex lg:gap-3">
          <div className="flex items-center gap-1">
            <Image src={star} width={12} height={12} alt="별점" className="lg:w-3.5 lg:h-3.5" />
            <span>{averageReviewRating}</span>
            <span className="text-gray-400">({reviewCount})</span>
          </div>
          <div className="flex gap-3 lg:gap-4">
            <span>경력 {career}년</span>
            <span>확정 {estimateCount}건</span>
          </div>
        </div>
      </div>
    </div>
  );
}