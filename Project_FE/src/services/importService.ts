import api from './api';
import type { PhieuNhapViewModel, ChiTietPhieuNhapViewModel } from '../types';

export interface CreatePhieuNhapPayload {
  maPhieuNhap: string;
  maNCC: string;
  maNV: string;
}

export interface AddDetailPayload {
  maCTPN: string;
  maPhieuNhap: string;
  maLaptop: string;
  soLuong: number;
  giaNhap: number;
}

export const importService = {
  /** GET /api-admin/PhieuNhap — Lấy danh sách tất cả phiếu nhập */
  getAll: async (): Promise<PhieuNhapViewModel[]> => {
    const res = await api.get<PhieuNhapViewModel[]>('/api-admin/PhieuNhap');
    return res.data;
  },

  /** GET /api-admin/PhieuNhap/{maPhieuNhap}/detail — Lấy chi tiết phiếu nhập */
  getDetail: async (maPhieuNhap: string): Promise<ChiTietPhieuNhapViewModel[]> => {
    const res = await api.get<ChiTietPhieuNhapViewModel[]>(`/api-admin/PhieuNhap/${maPhieuNhap}/detail`);
    return res.data;
  },

  /** POST /api-admin/PhieuNhap/create — Tạo phiếu nhập mới */
  create: async (payload: CreatePhieuNhapPayload): Promise<void> => {
    await api.post('/api-admin/PhieuNhap/create', payload);
  },

  /** POST /api-admin/PhieuNhap/add-detail — Thêm dòng chi tiết */
  addDetail: async (payload: AddDetailPayload): Promise<void> => {
    await api.post('/api-admin/PhieuNhap/add-detail', payload);
  },
};
