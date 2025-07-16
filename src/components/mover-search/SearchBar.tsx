// components/SearchBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useMover } from '@/context/MoverContext';
import Image from 'next/image';
import Search from '@/assets/images/searchIcon.svg';

export default function SearchBar() {
  const { state, setFilters } = useMover();
  const [searchTerm, setSearchTerm] = useState(state.filters.search);

  // 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchTerm });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center w-full h-14 px-4 py-3 rounded-xl bg-bg-200 text-gray-400">
        <Image src={Search} alt="검색" className="w-7 h-7 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="기사님 이름을 검색해주세요."
          className="w-full bg-transparent text-14-regular lg:text-20-regular placeholder-gray-400 focus:outline-none text-gray-700"
        />
      </div>
    </form>
  );
}