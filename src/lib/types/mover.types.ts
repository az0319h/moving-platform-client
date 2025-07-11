export interface MoverProfile {
  id: string;
  profileImage?: string;
  nickName: string;
  favoriteCount: number;
  averageReviewRating: number;
  reviewCount: number;
  career: number;
  estimateCount: number;
  //serviceType: MoveType[];
  region: string[];
  description: string;
  isFavorite?: boolean;
}
