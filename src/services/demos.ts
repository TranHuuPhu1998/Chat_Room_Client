import api from '@/lib/axios';
import { Demo } from '@/types/demos';

export const getDataDemo = async (): Promise<Demo[]> => {
  return await api.get('/Demos/json-dummy-data/5MB.json');
};
