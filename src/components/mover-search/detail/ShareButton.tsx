// ShareButton.tsx - 공유 버튼 업데이트
export default function ShareButtons() {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  const handleKakaoShare = () => {
    alert('카카오톡 공유');
  };

  const handleFacebookShare = () => {
    alert('페이스북 공유');
  };
  
  return (
    <div className="flex gap-3">
      {/* 링크 복사 */}
      <button 
        onClick={handleLinkCopy} 
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        title="링크 복사"
      >
        <span className="text-gray-600">🔗</span>
      </button>
      
      {/* 카카오톡 */}
      <button 
        onClick={handleKakaoShare}
        className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
        title="카카오톡 공유"
      >
        <span className="text-gray-900 font-bold text-xs">K</span>
      </button>
      
      {/* 페이스북 */}
      <button 
        onClick={handleFacebookShare}
        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        title="페이스북 공유"
      >
        <span className="text-white font-bold text-xs">f</span>
      </button>
    </div>
  );
}