export interface Mover {
   id: string;
   name?: string;
   profileImage?: string;
   nickName: string;
   career: number;
   introduction?: string;
   description?: string;
   serviceType?: string[];
   serviceArea?: string[];
   favoriteCount: number;
   estimateCount: number;
   averageReviewRating: number;
   reviewCount: number;
   isFavorite?: boolean;
}

export interface DropdownOption {
   label: string;
   value: string;
}

export interface GetMoversParams {
  page?: number;
  limit?: number;
  search?: string;
  area?: string;
  serviceType?: string;
  sortBy?: string;
}

export interface GetMoversResponse {
  movers: Mover[];
  hasMore: boolean;
  total: number;
  page: number;
  limit: number;
}