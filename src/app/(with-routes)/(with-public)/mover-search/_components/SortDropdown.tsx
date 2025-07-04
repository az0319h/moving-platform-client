"use client";

import Image from "next/image";
import { useState } from "react";
import chevronDownIcon from "@/assets/images/chevronDownIcon.svg"

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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption>(sortOptions[0]);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    console.log("정렬 선택됨:", option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[91px] h-[32px] lg:w-[114px] lg:h-[40px] border border-gray-200 rounded-lg text-12-regular lg:text-14-regular flex items-center justify-center"
      >
        {selected.label}
        <Image src={chevronDownIcon} alt="dropdownIcon" className="w-[20px] h-[20px]" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-[91px]  lg:w-[114px] bg-white border border-gray-200 rounded-lg shadow-md z-10"
        >
          {sortOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="w-full h-[32px] lg:w-[114px] lg:h-[40px] px-3 flex items-center cursor-pointer hover:bg-gray-100 text-14-regular"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
