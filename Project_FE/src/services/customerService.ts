import api from './api';
import type { KhachHang } from '../types';

export const customerService = {
  /** GET /api-admin/khachhang/get-all */
  getAll: async (): Promise<KhachHang[]> => {
    const res = await api.get<KhachHang[]>('/api-admin/khachhang/get-all');
    return res.data;
  },

  /** POST /api-admin/khachhang/create */
  create: async (kh: KhachHang): Promise<{ message: string }> => {
    const res = await api.post('/api-admin/khachhang/create', kh);
    return res.data;
  },
};

