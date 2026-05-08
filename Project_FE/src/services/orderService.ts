import api from './api';
import type { DonHang, ChiTietDonHang, ThongKeDoanhThu } from '../types';

export const orderService = {
  /** GET /{prefix}/donhang/get-all */
  getAll: async (): Promise<DonHang[]> => {
    let prefix = '/api-admin';
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'NhanVien') prefix = '/api-nhanvien';
    } catch (e) {}

    const res = await api.get<DonHang[]>(`${prefix}/donhang/get-all`);
    return res.data;
  },

  /** GET /api/donhang/get-by-kh/{khachHangId} */
  getByKhachHang: async (khachHangId: string): Promise<DonHang[]> => {
    const res = await api.get<DonHang[]>(`/api/donhang/get-by-kh/${khachHangId}`);
    return res.data;
  },

  /** POST /api/donhang/create */
  create: async (donHang: DonHang): Promise<boolean> => {
    const res = await api.post<{message: string}>('/api/donhang/create', donHang);
    return res.status === 200;
  },

  /** POST /api/donhang/add-detail */
  addDetail: async (chiTiet: ChiTietDonHang): Promise<boolean> => {
    const res = await api.post<{message: string}>('/api/donhang/add-detail', chiTiet);
    return res.status === 200;
  },

  /** PUT /{prefix}/donhang/{maDonHang}/trangthai */
  updateTrangThai: async (maDonHang: string, trangThai: string): Promise<boolean> => {
    let prefix = '/api-admin';
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'NhanVien') prefix = '/api-nhanvien';
    } catch (e) {}

    const res = await api.put<{message: string}>(
      `${prefix}/donhang/${maDonHang}/trangthai`, 
      JSON.stringify(trangThai),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.status === 200;
  },
};

export const thongKeService = {
  /**
   * GET /api/thongke/doanhthu?tuNgay=...&denNgay=...
   * Lấy thống kê doanh thu theo khoảng thời gian
   */
  getDoanhThu: async (tuNgay: string, denNgay: string): Promise<ThongKeDoanhThu[]> => {
    const res = await api.get<ThongKeDoanhThu[]>('/api/thongke/doanhthu', {
      params: { tuNgay, denNgay },
    });
    return res.data;
  },
};
