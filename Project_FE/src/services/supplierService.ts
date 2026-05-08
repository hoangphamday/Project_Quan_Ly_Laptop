import api from './api';
import type { NhaCungCap } from '../types';

export const supplierService = {
  /** GET /api-admin/nhacungcap/get-all */
  getAll: async (): Promise<NhaCungCap[]> => {
    const res = await api.get<NhaCungCap[]>('/api-admin/nhacungcap/get-all');
    return res.data;
  },

  /** GET /api-admin/nhacungcap/get-by-id/{id} */
  getById: async (id: string): Promise<NhaCungCap> => {
    const res = await api.get<NhaCungCap>(`/api-admin/nhacungcap/get-by-id/${id}`);
    return res.data;
  },

  /** POST /api-admin/nhacungcap/create */
  create: async (ncc: NhaCungCap): Promise<{ message: string }> => {
    const res = await api.post('/api-admin/nhacungcap/create', ncc);
    return res.data;
  },

  /** PUT /api-admin/nhacungcap/update */
  update: async (ncc: NhaCungCap): Promise<{ message: string }> => {
    const res = await api.put('/api-admin/nhacungcap/update', ncc);
    return res.data;
  },

  /** DELETE /api-admin/nhacungcap/delete/{id} */
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/api-admin/nhacungcap/delete/${id}`);
    return res.data;
  },
};

