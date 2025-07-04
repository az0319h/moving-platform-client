import { useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  multiColumn?: boolean;
}

export default function Dropdown({ label, options, onSelect, multiColumn }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option.label);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[75px] lg:w-[328px] border border-gray-200 rounded-lg px-3 py-2 text-14-regular text-left"
      >
        {selected}
      </button>

      {isOpen && (
      <div
        className={`
          absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-md 
          overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          ${multiColumn ? 'w-auto h-[180px] lg:w-auto lg:h-[320px]' : ''}
        `}
      >
        {multiColumn ? (
          <div className="grid grid-cols-2 divide-x divide-dotted divide-gray-200 max-h-full">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  cursor-pointer hover:bg-gray-100 text-14-regular
                  flex items-center justify-start
                  text-left 
                  w-[75px] h-[36px] lg:w-[164px] lg:h-[64px]
                  px-2
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  cursor-pointer hover:bg-gray-100 text-14-regular
                  flex items-center justify-start
                  text-left 
                  w-[89px] h-[36px] lg:w-[328px] lg:h-[64px]
                  px-3
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    )}

    </div>
  );
}
