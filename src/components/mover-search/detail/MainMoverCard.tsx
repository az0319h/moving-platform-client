// Main mover card with profile and service tags
import { Mover, MoveType } from '@/lib/types/mover.types';
import MoverProfile from './MoverProfile';

export default function MainMoverCard({ mover }: { mover: Mover }) {
  return (
    <div className="p-4 lg:p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="flex gap-2 mb-3 lg:mb-2">
        {mover.serviceType.map((type) => (
          <span
            key={type}
            className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-sm font-semibold text-blue-600 bg-blue-50 rounded-full"
          >
            {type}
          </span>
        ))}
      </div>
      
      <p className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 mb-3">
        고객님의 물품을 안전하게 운송해 드립니다.
      </p>
      
      <MoverProfile {...mover} />
    </div>
  );
}