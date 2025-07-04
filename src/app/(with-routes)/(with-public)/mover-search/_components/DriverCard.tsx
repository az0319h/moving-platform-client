import Image from 'next/image';
import solidDocumentIcon from '@/assets/images/solidDocumentIcon.svg';
import solidBoxIcon from '@/assets/images/solidBoxIcon.svg';
import MoverProfile from '@/components/common/profile/MoverProfile';

export default function DriverCard() {
  return (
    <div className="w-full p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* 서비스 태그 */}
      <div className="flex items-center mb-2 gap-2">
        <div className="flex items-center bg-primary-blue-100 px-2 py-1 rounded">
          <Image src={solidBoxIcon} alt="소형이사" className="w-3 h-3 mr-1" />
          <span className="text-primary-blue-300 text-12-medium">소형이사</span>
        </div>
        <div className="flex items-center bg-secondary-red-100 px-2 py-1 rounded">
          <Image src={solidDocumentIcon} alt="지정견적" className="w-3 h-3 mr-1" />
          <span className="text-secondary-red-200 text-12-medium">지정 견적 요청</span>
        </div>
      </div>

      {/* 소개 문구 */}
      <p className="text-14-regular md:text-16-regular lg:text-18-regular text-gray-700 mb-3">
        고객님의 물품을 안전하게 운송해 드립니다.
      </p>

      {/* MoverProfile 삽입 */}
      <MoverProfile
        big={false}
        isLiked={false}
        handleLikedClick={() => console.log('좋아요 클릭')}
        nickName="김코드 기사님"
        favoriteCount={136}
        averageReviewRating={5.0}
        reviewCount={178}
        career={7}
        estimateCount={334}
      />
    </div>
  );
}
