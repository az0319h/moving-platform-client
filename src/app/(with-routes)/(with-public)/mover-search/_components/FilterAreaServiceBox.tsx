// components/FilterAreaServiceBox.tsx
import Dropdown, { DropdownOption } from "./Dropdown";

interface Props {
  areaOptions: DropdownOption[];
  serviceOptions: DropdownOption[];
  onSelect: (type: string, option: DropdownOption) => void;
}

export default function FilterAreaServiceBox({ areaOptions, serviceOptions, onSelect }: Props) {
  return (
    <div className="flex flex-row lg:block w-full lg:w-[328px]">
      <div className="mb-4">
        <label className="hidden lg:block text-14-semibold mb-2">지역을 선택해주세요</label>
        <Dropdown
          label="지역"
          options={areaOptions}
          onSelect={(option) => onSelect("지역", option)}
          multiColumn
        />
      </div>
      <div className="mb-4">
        <label className="hidden lg:block text-14-semibold mb-2">어떤 서비스가 필요하세요?</label>
        <Dropdown
          label="서비스"
          options={serviceOptions}
          onSelect={(option) => onSelect("서비스", option)}
        />
      </div>
    </div>
  );
}
