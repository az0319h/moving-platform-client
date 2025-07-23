import { Mover } from "@/lib/types";

// 환경변수 확인을 위한 로그 (개발 시에만)
console.log("API_BASE URL:", process.env.NEXT_PUBLIC_API_URL);

const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/movers`
  : "http://localhost:4000/movers";

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

// 지역 매핑
export const areaMapping: { [key: string]: string[] } = {
   seoul: ["서울"],
   incheon: ["인천"],
   daejeon: ["대전"],
   daegu: ["대구"],
   gwangju: ["광주"],
   busan: ["부산"],
   ulsan: ["울산"],
   sejong: ["세종"],
   gyeonggi: ["경기"],
   gangwon: ["강원"],
   chungbuk: ["충북"],
   chungnam: ["충남"],
   jeonbuk: ["전북"],
   jeonnam: ["전남"],
   gyeongbuk: ["경북"],
   gyeongnam: ["경남"],
   jeju: ["제주"],
};

export const getMovers = async (
  params: GetMoversParams = {},
  token?: string,
): Promise<GetMoversResponse> => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      area,
      serviceType,
      sortBy,
    } = params;

    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    if (search) queryParams.append("search", search);
    if (area && area !== "all") queryParams.append("area", area);
    if (serviceType && serviceType !== "all")
      queryParams.append("serviceType", serviceType);
    if (sortBy) queryParams.append("sortBy", sortBy);

    console.log("API 요청 URL:", `${API_BASE}?${queryParams.toString()}`);

    const res = await fetch(`${API_BASE}?${queryParams.toString()}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) throw new Error("Failed to fetch movers");

    interface BackendMover {
      id: string;
      nickName: string;
      serviceType: string[];
      career: number;
      averageReviewRating: number;
      reviewCount: number;
      estimateCount: number;
      profileImage?: string;
      isFavorite?: boolean;
      description?: string;
      favoriteCount?: number;
      serviceArea?: string[];
    }

    interface BackendResponse {
      movers?: BackendMover[];
      total?: number;
      page?: number;
      limit?: number;
      hasMore?: boolean;
    }

    const data = (await res.json()) as BackendResponse;

    const movers = (data.movers || []).map((mover) => ({
      ...mover,
      favoriteCount: mover.favoriteCount ?? 0,
      region: mover.serviceArea ?? [],
      description:
        mover.description ?? "고객님의 물품을 안전하게 운송해 드립니다.",
      career: mover.career ?? 0,
      averageReviewRating: mover.averageReviewRating ?? 0,
      reviewCount: mover.reviewCount ?? 0,
      estimateCount: mover.estimateCount ?? 0,
    })) as Mover[];

    return {
      movers,
      hasMore: data.hasMore ?? movers.length === limit,
      total: data.total ?? movers.length,
      page: data.page ?? page,
      limit: data.limit ?? limit,
    };
  } catch (error) {
    console.error("기사 목록 조회 실패:", error);
    throw error;
  }
};

export const getMoverById = async (
   id: string,
   token?: string,
): Promise<Mover> => {
   const res = await fetch(`${API_BASE}/${id}`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
   });

   if (!res.ok) throw new Error("기사 상세 조회 실패");

   return res.json();
};

// 새로운 토글 API (추천)
export const toggleFavoriteMover = async (moverId: string, token: string) => {
   console.log(`찜 토글 요청 시작: ${moverId}`);
   
   const res = await fetch(`${API_BASE}/${moverId}/toggle-favorite`, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
   });

   console.log(`찜 토글 응답 상태: ${res.status}`);

   if (!res.ok) {
      const errorText = await res.text();
      console.error(`찜 토글 실패 응답:`, errorText);
      
      try {
         const errorData = JSON.parse(errorText);
         throw new Error(errorData.message || "찜 처리에 실패했습니다.");
      } catch (parseError) {
         if (res.status === 409) {
            throw new Error("이미 처리된 요청입니다.");
         } else if (res.status >= 500) {
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
         } else {
            throw new Error("찜 처리에 실패했습니다.");
         }
      }
   }

   const result = await res.json();
   console.log(`찜 토글 성공:`, result);
   return result;
};

// 레거시 API들 (기존 호환성 유지)
export const favoriteMover = async (moverId: string, token: string) => {
   console.log(`찜하기 요청 시작: ${moverId}`);
   
   const res = await fetch(`${API_BASE}/${moverId}/favorite`, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
   });

   console.log(`찜하기 응답 상태: ${res.status}`);

   if (!res.ok) {
      const errorText = await res.text();
      console.error(`찜하기 실패 응답:`, errorText);
      
      try {
         const errorData = JSON.parse(errorText);
         throw new Error(errorData.message || "기사 찜하기에 실패했습니다.");
      } catch (parseError) {
         if (res.status === 409) {
            throw new Error("이미 찜한 기사님입니다.");
         } else if (res.status >= 500) {
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
         } else {
            throw new Error("기사 찜하기에 실패했습니다.");
         }
      }
   }

   const result = await res.json();
   console.log(`찜하기 성공:`, result);
   return result;
};

export const unfavoriteMover = async (moverId: string, token: string) => {
   console.log(`찜 해제 요청 시작: ${moverId}`);
   
   const res = await fetch(`${API_BASE}/${moverId}/favorite`, {
      method: "DELETE",
      headers: { 
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      },
   });

   console.log(`찜 해제 응답 상태: ${res.status}`);

   if (!res.ok) {
      const errorText = await res.text();
      console.error(`찜 해제 실패 응답:`, errorText);
      
      try {
         const errorData = JSON.parse(errorText);
         throw new Error(errorData.message || "기사 찜 해제에 실패했습니다.");
      } catch (parseError) {
         if (res.status === 404) {
            throw new Error("찜하지 않은 기사님입니다.");
         } else if (res.status >= 500) {
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
         } else {
            throw new Error("기사 찜 해제에 실패했습니다.");
         }
      }
   }

   const result = await res.json();
   console.log(`찜 해제 성공:`, result);
   return result;
};