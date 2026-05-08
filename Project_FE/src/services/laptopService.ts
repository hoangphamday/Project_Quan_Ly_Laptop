import api from './api';
import type { Laptop } from '../types';

export const laptopService = {
  /** GET /api-admin/laptop/get-all */
  getAll: async (): Promise<Laptop[]> => {
    const res = await api.get<Laptop[]>('/api-admin/laptop/get-all');
    return res.data;
  },

  /** GET /api-admin/laptop/get-by-id/{id} */
  getById: async (id: string): Promise<Laptop> => {
    const res = await api.get<Laptop>(`/api-admin/laptop/get-by-id/${id}`);
    return res.data;
  },

  /** POST /api-admin/laptop/create */
  create: async (laptop: Laptop): Promise<{ message: string }> => {
    const res = await api.post('/api-admin/laptop/create', laptop);
    return res.data;
  },

  /** PUT /api-admin/laptop/update */
  update: async (laptop: Laptop): Promise<{ message: string }> => {
    const res = await api.put('/api-admin/laptop/update', laptop);
    return res.data;
  },

  /** DELETE /api-admin/laptop/delete/{id} */
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/api-admin/laptop/delete/${id}`);
    return res.data;
  },
};

