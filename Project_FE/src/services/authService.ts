import api from './api';
import type { TaiKhoan } from '../types';

/**
 * Thử đăng nhập lần lượt qua các API theo thứ tự ưu tiên:
 * 1. API_KhachHang (/api)         — port 7181  → KhachHang + Admin đều được (không lọc role)
 * 2. API_Admin     (/api-admin)   — port 7178  → chỉ Admin
 * 3. API_NhanVien  (/api-nhanvien)— port 7204  → chỉ NhanVien
 */
export const authService = {
  login: async (tenDangNhap: string, matKhau: string): Promise<TaiKhoan> => {
    const payload = { tenDangNhap, matKhau };

    // 1. Thử API_KhachHang trước (proxy /api → 7181)
    //    Controller này trả về TaiKhoan đầy đủ, không lọc role
    try {
      const res = await api.post<TaiKhoan>('/api/taikhoan/login', payload);
      if (res.data?.token) return res.data;
    } catch {
      // không kết nối được hoặc sai mật khẩu → thử tiếp
    }

    // 2. Thử API_Admin (proxy /api-admin → 7178)
    try {
      const res = await api.post<TaiKhoan>('/api-admin/taikhoan/login', payload);
      if (res.data?.token) return res.data;
    } catch {
      // không kết nối được → thử tiếp
    }

    // 3. Thử API_NhanVien (proxy /api-nhanvien → 7204)
    const res = await api.post<TaiKhoan>('/api-nhanvien/taikhoan/login', payload);
    return res.data;
  },

  /**
   * Đăng ký - POST /api/taikhoan/register (qua API_KhachHang)
   */
  register: async (tenDangNhap: string, matKhau: string, role: string): Promise<any> => {
    const maTK = 'TK' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const response = await api.post('/api/taikhoan/register', {
      maTK,
      tenDangNhap,
      matKhau,
      role,
    });
    return response.data;
  },
};

