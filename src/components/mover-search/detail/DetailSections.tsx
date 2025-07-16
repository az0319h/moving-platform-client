// DetailSections.tsx - 섹션 스타일 업데이트
import { Mover } from '@/lib/types/mover.types';
import Line from './Line';


export default function DetailSections({ mover }: { mover: Mover }) {
  return (
    <div className="space-y-6">
      {/* 상세설명 */}
      <div className=" p-4 lg:p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">상세설명</h3>
        <div className="text-sm lg:text-base text-gray-700 leading-relaxed whitespace-pre-line">
          {mover.description}
        </div>
      </div>
      <Line/>
      {/* 제공 서비스 */}
      <div className="p-4 lg:p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">제공 서비스</h3>
        <ServiceTags services={mover.serviceType} />
      </div>
      <Line/>
      {/* 서비스 가능 지역 */}
      <div className="p-4 lg:p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">서비스 가능 지역</h3>
        <RegionTags regions={mover.region} />
      </div>
    </div>
  );
}

// 서비스 태그 컴포넌트
function ServiceTags({ services }: { services: string[] }) {
  const getServiceTypeLabel = (type: string) => {
    const serviceMap: { [key: string]: string } = {
      'SMALL': '소형이사',
      'HOME': '가정이사', 
      'OFFICE': '사무실이사'
    };
    return serviceMap[type] || type;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {services.map((service) => (
        <span 
          key={service} 
          className="inline-block bg-blue-50 text-blue-600 text-sm px-3 py-1.5 rounded-full border border-blue-200"
        >
          {getServiceTypeLabel(service)}
        </span>
      ))}
    </div>
  );
}

// 지역 태그 컴포넌트
function RegionTags({ regions }: { regions: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => (
        <span 
          key={region} 
          className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full border border-gray-200"
        >
          {region}
        </span>
      ))}
    </div>
  );
}