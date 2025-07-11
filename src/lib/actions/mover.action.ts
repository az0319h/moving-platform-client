// src/lib/actions/mover.action.ts
import axios from 'axios';

export type MoveType = 'SMALL' | 'HOME' | 'OFFICE';

export interface Driver {
  id: string;
  profileImage?: string;
  nickName: string;
  favoriteCount: number;
  averageReviewRating: number;
  reviewCount: number;
  career: number;
  estimateCount: number;
  serviceType: MoveType[];
  region: string[];
  description: string;
  isFavorite?: boolean;
}


const API_BASE = `${process.env.BASE_URL}/api/movers`;


export const getMoverById = async (id: string, token?: string): Promise<Driver> => {
  console.log('BASE_URL', process.env.BASE_URL);
  const res = await axios.get<Driver>(`${API_BASE}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};


export const getMovers = async (token?: string) => {
  const res = await axios.get(API_BASE, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const favoriteMover = async (moverId: string, token: string) => {
  const res = await axios.post(`${API_BASE}/${moverId}/favorite`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const unfavoriteMover = async (moverId: string, token: string) => {
  const res = await axios.delete(`${API_BASE}/${moverId}/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
