"use client";

import KakaoShareButton from "./KakaoShareButton";
import LinkShareButton from "./LinkShareButton";
import FacebookShareButton from "./FacebookShareButton";

export default function SocialShareGroup({ text }: { text: string }) {
   return (
      <div className="flex flex-col gap-2 lg:gap-5.5">
         <p className="text-14-semibold lg:text-20-bold">{text}</p>
         <div className="flex items-center gap-2 lg:gap-4">
            <LinkShareButton />
            <KakaoShareButton />
            <FacebookShareButton />
         </div>
      </div>
   );
}
