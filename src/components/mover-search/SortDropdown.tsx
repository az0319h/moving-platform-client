// components/mover-search/SortDropdown.tsx
"use client";

import { useMover } from '@/context/MoverContext';
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import chevronDownIcon from "@/assets/images/chevronDownIcon.svg";

interface DropdownOption {
  label: string;
  value: string;
}

const sortOptions: DropdownOption[] = [
  { label: "리뷰 많은순", value: "mostReviewed" },
  { label: "평점 높은순", value: "highRating" },
  { label: "경력 높은순", value: "highExperience" },
  { label: "확정 많은순", value: "mostBooked" },
];

export default function SortDropdown() {
  const { state, setFilters } = useMover();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption>(
    sortOptions.find(option => option.value === state.filters.sortBy) || sortOptions[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    setFilters({ sortBy: option.value });
  };

  // 필터 상태 변경 시 선택된 옵션 업데이트
  useEffect(() => {
    const currentOption = sortOptions.find(option => option.value === state.filters.sortBy);
    if (currentOption) {
      setSelected(currentOption);
    }
  }, [state.filters.sortBy]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left lg:pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-24 h-8 lg:w-28 lg:h-10 rounded-lg text-12-semibold lg:text-14-semibold flex items-center justify-center gap-1"
      >
        {selected.label}
        <Image src={chevronDownIcon} alt="dropdownIcon" className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 lg:w-28 bg-white border border-gray-100 rounded-lg shadow-md z-10">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full h-8 lg:h-10 px-3 flex items-center cursor-pointer hover:bg-gray-100 text-12-medium lg:text-14-medium ${
                selected.value === option.value ? 'bg-primary-blue-50 text-primary-blue-300' : ''
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}