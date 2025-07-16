// ShareSection.tsx - 공유 섹션 업데이트
import { Mover } from '@/lib/types/mover.types';
import ShareButtons from './ShareButton';
import Line from './Line';

export default function ShareSection() {
  return (
    <div className="p-4 lg:p-5">
      <p className="text-base font-medium text-gray-900 mb-4">
        나만 알기엔 아쉬운 기사님인가요?
      </p>
      <ShareButtons />
      <div className='lg:hidden pt-5'><Line/></div>
    </div>
  );
}
