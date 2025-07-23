"use client";

import {
   toggleFavoriteMover,
   getMovers,
   GetMoversParams,
} from "@/lib/api/mover";
import { areaMapping } from "@/constants/mover.constants";
import { Mover } from "@/lib/types";
import {
   createContext,
   useContext,
   useReducer,
   useEffect,
   ReactNode,
   useCallback,
   useRef,
} from "react";

// 상태관리: 기사 목록, 로딩, 에러, 페이지, 필터, 즐겨찾기 상태를 useReducer로 관리
// 데이터 로드: loadMovers: 로드, 무한 스크롤
// 필터 제어: setFilters, resetFilters
// 즐겨찾기 토글: toggleFavorite
// 필터 변경 감지

// Mover 관련 상태 타입 정의
interface MoverState {
   movers: Mover[];
   loading: boolean;
   error: string | null;
   hasMore: boolean;
   currentPage: number;
   filters: {
      search: string;
      area: string;
      serviceType: string;
      sortBy: string;
   };
}

// 리듀서 액션 타입 정의
type MoverAction =
   | { type: "SET_LOADING"; payload: boolean }
   | { type: "SET_ERROR"; payload: string | null }
   | { type: "SET_MOVERS"; payload: Mover[] }
   | { type: "APPEND_MOVERS"; payload: Mover[] }
   | { type: "SET_HAS_MORE"; payload: boolean }
   | { type: "SET_CURRENT_PAGE"; payload: number }
   | { type: "SET_FILTERS"; payload: Partial<MoverState["filters"]> }
   | { type: "RESET_FILTERS" }
   | { type: "RESET_MOVERS" }
   | {
        type: "UPDATE_MOVER_FAVORITE";
        payload: { moverId: string; isFavorite: boolean; favoriteCount?: number };
     };

// 초기 상태 값
const initialState: MoverState = {
   movers: [],
   loading: false,
   error: null,
   hasMore: true,
   currentPage: 1,
   filters: {
      search: "",
      area: "all",
      serviceType: "all",
      sortBy: "mostReviewed",
   },
};

// 상태 변경을 담당하는 리듀서 함수
const moverReducer = (state: MoverState, action: MoverAction): MoverState => {
   switch (action.type) {
      case "SET_LOADING":
         return { ...state, loading: action.payload };
      case "SET_ERROR":
         return { ...state, error: action.payload };
      case "SET_MOVERS":
         return { ...state, movers: action.payload };
      case "APPEND_MOVERS":
         const existingIds = new Set(state.movers.map((mover) => mover.id));
         const newMovers = action.payload.filter(
            (mover) => !existingIds.has(mover.id),
         );
         return { ...state, movers: [...state.movers, ...newMovers] };
      case "SET_HAS_MORE":
         return { ...state, hasMore: action.payload };
      case "SET_CURRENT_PAGE":
         return { ...state, currentPage: action.payload };
      case "SET_FILTERS":
         return { ...state, filters: { ...state.filters, ...action.payload } };
      case "RESET_FILTERS":
         return {
            ...state,
            filters: {
               search: "",
               area: "all",
               serviceType: "all",
               sortBy: "mostReviewed",
            },
         };
      case "RESET_MOVERS":
         return { ...state, movers: [], currentPage: 1, hasMore: true };
      case "UPDATE_MOVER_FAVORITE":
         return {
            ...state,
            movers: state.movers.map((mover) =>
               mover.id === action.payload.moverId
                  ? { 
                      ...mover, 
                      isFavorite: action.payload.isFavorite,
                      favoriteCount: action.payload.favoriteCount ?? mover.favoriteCount
                    }
                  : mover,
            ),
         };
      default:
         return state;
   }
};

// 컨텍스트가 제공하는 값 타입 정의
interface MoverContextType {
   state: MoverState;
   loadMovers: (reset?: boolean) => Promise<void>;
   loadMore: () => Promise<void>;
   setFilters: (filters: Partial<MoverState["filters"]>) => void;
   resetFilters: () => void;
   toggleFavorite: (moverId: string, token: string) => Promise<void>;
}

const MoverContext = createContext<MoverContextType | undefined>(undefined);

// Provider 컴포넌트 정의
export const MoverProvider = ({ children }: { children: ReactNode }) => {
   const [state, dispatch] = useReducer(moverReducer, initialState);
   
   // 진행 중인 찜하기 요청들을 추적하기 위한 ref
   const pendingFavoriteRequests = useRef<Set<string>>(new Set());

   // 기사 목록 로드 함수
   const loadMovers = useCallback(async (reset = false) => {
      try {
         dispatch({ type: "SET_LOADING", payload: true });
         dispatch({ type: "SET_ERROR", payload: null });

         if (reset) {
            dispatch({ type: "RESET_MOVERS" });
         }

         let area = state.filters.area !== "all" ? state.filters.area : undefined;
         if (area && areaMapping[area]) {
            area = areaMapping[area][0];
         }

         const params: GetMoversParams = {
            page: reset ? 1 : state.currentPage,
            limit: 10,
            search: state.filters.search || undefined,
            area,
            serviceType:
               state.filters.serviceType !== "all"
                  ? state.filters.serviceType
                  : undefined,
            sortBy: state.filters.sortBy,
         };

         const token = localStorage.getItem("token");
         const response = await getMovers(params, token || undefined);

         if (reset) {
            dispatch({ type: "SET_MOVERS", payload: response.movers });
            dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
         } else {
            dispatch({ type: "APPEND_MOVERS", payload: response.movers });
         }

         dispatch({ type: "SET_HAS_MORE", payload: response.hasMore });
      } catch (error) {
         dispatch({
            type: "SET_ERROR",
            payload: "기사님 목록을 불러오는데 실패했습니다.",
         });
      } finally {
         dispatch({ type: "SET_LOADING", payload: false });
      }
   }, [state.filters, state.currentPage]);

   // 무한 스크롤용 추가 데이터 로드 함수
   const loadMore = useCallback(async () => {
      if (!state.hasMore || state.loading) return;

      try {
         dispatch({ type: "SET_LOADING", payload: true });

         const nextPage = state.currentPage + 1;

         let area = state.filters.area !== "all" ? state.filters.area : undefined;
         if (area && areaMapping[area]) {
            area = areaMapping[area][0];
         }

         const params: GetMoversParams = {
            page: nextPage,
            limit: 10,
            search: state.filters.search || undefined,
            area,
            serviceType:
               state.filters.serviceType !== "all"
                  ? state.filters.serviceType
                  : undefined,
            sortBy: state.filters.sortBy,
         };

         const token = localStorage.getItem("token");
         const response = await getMovers(params, token || undefined);

         dispatch({ type: "SET_CURRENT_PAGE", payload: nextPage });
         dispatch({ type: "APPEND_MOVERS", payload: response.movers });
         dispatch({ type: "SET_HAS_MORE", payload: response.hasMore });
      } catch (error) {
         dispatch({
            type: "SET_ERROR",
            payload: "추가 데이터를 불러오는데 실패했습니다.",
         });
      } finally {
         dispatch({ type: "SET_LOADING", payload: false });
      }
   }, [state.hasMore, state.loading, state.currentPage, state.filters]);

   // 필터 설정 함수
   const setFilters = useCallback((filters: Partial<MoverState["filters"]>) => {
      dispatch({ type: "SET_FILTERS", payload: filters });
   }, []);

   // 필터 초기화 함수
   const resetFilters = useCallback(() => {
      dispatch({ type: "RESET_FILTERS" });
   }, []);

   // 개선된 찜 토글 함수 (새로운 API 사용)
   const toggleFavorite = useCallback(
      async (moverId: string, token: string) => {
         // 이미 진행 중인 요청이 있는지 확인
         if (pendingFavoriteRequests.current.has(moverId)) {
            console.log("찜하기 요청이 이미 진행 중입니다.");
            return;
         }

         const mover = state.movers.find((m) => m.id === moverId);
         if (!mover) {
            console.error("기사를 찾을 수 없습니다.");
            return;
         }

         // 진행 중인 요청으로 추가
         pendingFavoriteRequests.current.add(moverId);

         try {
            // 새로운 토글 API 호출
            const result = await toggleFavoriteMover(moverId, token);

            // 서버에서 받은 실제 데이터로 UI 업데이트
            dispatch({
               type: "UPDATE_MOVER_FAVORITE",
               payload: { 
                  moverId, 
                  isFavorite: result.isFavorite,
                  favoriteCount: result.favoriteCount
               },
            });

            console.log(`찜 ${result.action === 'added' ? '추가' : '해제'} 성공`);
         } catch (error) {
            console.error("찜 처리 실패:", error);
            
            // 사용자에게 오류 알림
            const errorMessage = error instanceof Error ? error.message : "찜 처리 중 오류가 발생했습니다.";
            alert(errorMessage);
         } finally {
            // 진행 중인 요청에서 제거
            pendingFavoriteRequests.current.delete(moverId);
         }
      },
      [state.movers],
   );

   // 필터 변경 시 300ms 딜레이 후 데이터 재로드 (디바운스)
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         loadMovers(true);
      }, 300);

      return () => clearTimeout(timeoutId);
   }, [
      state.filters.search,
      state.filters.area,
      state.filters.serviceType,
      state.filters.sortBy,
   ]);

   return (
      <MoverContext.Provider
         value={{
            state,
            loadMovers,
            loadMore,
            setFilters,
            resetFilters,
            toggleFavorite,
         }}
      >
         {children}
      </MoverContext.Provider>
   );
};

// 컨텍스트 훅
export const useMover = () => {
   const context = useContext(MoverContext);
   if (!context) {
      throw new Error("useMover must be used within a MoverProvider");
   }
   return context;
};