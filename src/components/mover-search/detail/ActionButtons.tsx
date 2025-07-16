// ActionButtons.tsx - 우측 액션 버튼 업데이트
import { Mover } from '@/lib/types/mover.types';

export default function ActionButtons({ mover }: { mover: Mover }) {
  return (
    <div className="p-4 lg:p-5">
      <div className="text-center mb-4">
        <p className="text-base font-medium text-gray-900 mb-1">
          {mover.nickName} 기사님에게 지정 견적을 요청해보세요!
        </p>
      </div>
      
      <div className="space-y-3">
        <FavoriteButton moverId={mover.id} isFavorite={mover.isFavorite ?? false} />
        <EstimateRequestButton moverId={mover.id} />
      </div>
    </div>
  );
}

// 찜하기 버튼
function FavoriteButton({ moverId, isFavorite }: { moverId: string; isFavorite: boolean }) {
  const handleClick = () => {
    alert(`찜 ${isFavorite ? '해제' : '추가'}: ${moverId}`);
  };
  
  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
    >
      <span>♡</span>
      <span>기사님 찜하기</span>
    </button>
  );
}

// 견적 요청 버튼
function EstimateRequestButton({ moverId }: { moverId: string }) {
  const handleClick = () => {
    alert(`견적 요청: ${moverId}`);
  };
  
  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
    >
      지정 견적 요청하기
    </button>
  );
}
