import api from './api';
import type { TaiKhoan } from '../types';

export const accountService = {
  /** GET /api-admin/taikhoan/get-all */
  getAll: async (): Promise<TaiKhoan[]> => {
    const response = await api.get('/api-admin/taikhoan/get-all');
    return response.data;
  },

  /** PUT /api-admin/taikhoan/update – Cập nhật vai trò và trạng thái */
  update: async (tk: TaiKhoan): Promise<{ message: string }> => {
    const response = await api.put('/api-admin/taikhoan/update', tk);
    return response.data;
  },

  /** DELETE /api-admin/taikhoan/delete/{maTK} */
  delete: async (maTK: string): Promise<{ message: string }> => {
    const response = await api.delete(`/api-admin/taikhoan/delete/${maTK}`);
    return response.data;
  },
};

