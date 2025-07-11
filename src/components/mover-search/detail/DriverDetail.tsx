// src/components/mover-search/detail/DriverDetail.tsx
'use client';

import Image from 'next/image';
import React from 'react';
import heart from '@/assets/images/likeFilledIcon.svg';
import inActiveHeart from '@/assets/images/likeOutlineIcon.svg';
import star from '@/assets/images/starFilledIcon.svg';
import { Driver, MoveType } from '@/lib/actions/mover.action';

type Props = {
  driver: Driver;
};

export default function DriverDetailPage({ driver }: Props) {
  return (
    <div className="flex flex-col w-full gap-6 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-4 w-full lg:w-2/3">
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex gap-2 mb-2">
            {driver.serviceType.map((type) => (
              <span
                key={type}
                className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-base lg:text-lg font-semibold mb-3">
            고객님의 물품을 안전하게 운송해 드립니다.
          </p>
          <MoverProfile {...driver} />
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold mb-3">상세 설명</h3>
          <p className="text-gray-700 whitespace-pre-line">{driver.description}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold mb-3">제공 서비스</h3>
          <ServiceTags services={driver.serviceType} />
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold mb-3">서비스 가능 지역</h3>
          <RegionTags regions={driver.region} />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-800 mb-4">
            {driver.nickName} 기사님에게 지정 견적을 요청해보세요!
          </p>
          <div className="flex flex-col gap-3">
            <FavoriteButton driverId={driver.id} isFavorite={driver.isFavorite ?? false} />
            <EstimateRequestButton driverId={driver.id} />
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-800 mb-3">나만 알기엔 아쉬운 기사님인가요?</p>
          <ShareButtons />
        </div>
      </div>
    </div>
  );
}

// Profile section
function MoverProfile({
  profileImage,
  nickName,
  favoriteCount,
  averageReviewRating,
  reviewCount,
  career,
  estimateCount,
  isFavorite,
}: Driver) {
  return (
    <div className="flex items-center bg-white border border-gray-100 rounded-md p-4 shadow">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 mr-4">
        <Image src={profileImage || '/default-profile.png'} alt="프로필" fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">{nickName} 기사님</span>
          <div className="flex items-center gap-1">
            <Image src={isFavorite ? heart : inActiveHeart} width={20} height={20} alt="찜" />
            <span className="text-gray-600">{favoriteCount}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 flex gap-4 mt-2">
          <span className="flex items-center gap-1">
            <Image src={star} width={14} height={14} alt="별점" />
            {averageReviewRating} ({reviewCount})
          </span>
          <span>| 경력 {career}년</span>
          <span>| 확정 {estimateCount}건</span>
        </div>
      </div>
    </div>
  );
}

// Estimate Request Button
function EstimateRequestButton({ driverId }: { driverId: string }) {
  const handleClick = () => {
    alert(`견적 요청: ${driverId}`);
  };
  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600"
    >
      견적 요청하기
    </button>
  );
}

// Favorite Button
function FavoriteButton({ driverId, isFavorite }: { driverId: string; isFavorite: boolean }) {
  const handleClick = () => {
    alert(`찜 ${isFavorite ? '해제' : '추가'}: ${driverId}`);
  };
  return (
    <button
      onClick={handleClick}
      className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
        isFavorite ? 'bg-gray-200 text-gray-800' : 'bg-blue-100 text-blue-700'
      }`}
    >
      {isFavorite ? '찜 해제' : '찜하기'}
    </button>
  );
}

// 서비스 태그
function ServiceTags({ services }: { services: MoveType[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {services.map((service) => (
        <span key={service} className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">
          {service}
        </span>
      ))}
    </div>
  );
}

// 지역 태그
function RegionTags({ regions }: { regions: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => (
        <span key={region} className="bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full">
          {region}
        </span>
      ))}
    </div>
  );
}

// 공유 버튼
function ShareButtons() {
  const handleShare = () => {
    alert('링크 복사됨!');
  };
  return (
    <div className="flex gap-3">
      <button onClick={handleShare} className="px-3 py-1 bg-gray-100 rounded text-sm">
        링크 복사
      </button>
      <button className="px-3 py-1 bg-gray-100 rounded text-sm">카카오톡</button>
      <button className="px-3 py-1 bg-gray-100 rounded text-sm">URL 공유</button>
    </div>
  );
}
