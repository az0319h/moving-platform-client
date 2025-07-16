// components/mover-search/FilterAreaServiceBox.tsx
'use client';

import { useMover } from '@/context/MoverContext';
import Dropdown, { DropdownOption } from './Dropdown';

interface FilterAreaServiceBoxProps {
  areaOptions: DropdownOption[];
  serviceOptions: DropdownOption[];
  onSelect: (type: string, option: DropdownOption) => void;
}

export default function FilterAreaServiceBox({
  areaOptions,
  serviceOptions,
  onSelect,
}: FilterAreaServiceBoxProps) {
  const { state, setFilters, resetFilters } = useMover();

  const handleAreaSelect = (option: DropdownOption) => {
    setFilters({ area: option.value });
    onSelect('area', option);
  };

  const handleServiceSelect = (option: DropdownOption) => {
    setFilters({ serviceType: option.value });
    onSelect('serviceType', option);
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="flex flex-row lg:flex-col w-full lg:w-80 mb-1">
        <div className="flex flex-row justify-between items-center mb-6 px-3 pb-4 border-b border-b-gray-100">
            <h2 className="text-20-medium font-semibold">필터</h2>
            <p 
              className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors"
              onClick={handleReset}
            >
              초기화
            </p>
        </div>
        
        <div className="lg:mr-0 mr-2">
          <h3 className="hidden lg:block text-lg font-semibold mb-4">
            지역을 선택해주세요
          </h3>
          <Dropdown
            label="전체"
            options={areaOptions}
            onSelect={handleAreaSelect}
            multiColumn={true}
            value={state.filters.area}
          />
        </div>

        <div className='lg:mt-6'>
          <h3 className="hidden lg:block text-lg font-semibold mb-4">
            어떤 서비스가 필요하세요?
          </h3>
          <Dropdown
            label="전체"
            options={serviceOptions}
            onSelect={handleServiceSelect}
            multiColumn={false}
            value={state.filters.serviceType}
          />
        </div>
      </div>
  );
}