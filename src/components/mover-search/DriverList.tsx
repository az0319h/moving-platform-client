// components/mover-search/DriverList.tsx
'use client';

import { useMover } from '@/context/MoverContext';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import DriverCard from './DriverCard';

export default function DriverList() {
  const { state, loadMore } = useMover();
  const { movers, loading, error, hasMore } = state;

  const { setLoadingRef } = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-blue-300 text-white rounded-lg hover:bg-primary-blue-400"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {movers.map((mover, index) => (
        <DriverCard key={`${mover.id}-${index}`} mover={mover} />
      ))}
      
      {/* 무한스크롤 트리거 */}
      {hasMore && (
        <div ref={setLoadingRef} className="flex items-center justify-center p-8">
          {loading && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-blue-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-500">로딩 중...</span>
            </div>
          )}
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && movers.length > 0 && (
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">모든 기사님을 확인했습니다.</p>
        </div>
      )}

      {/* 데이터가 없을 때 */}
      {!loading && movers.length === 0 && (
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}