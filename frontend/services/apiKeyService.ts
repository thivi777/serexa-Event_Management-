import api from '../lib/api';

export const getApiKeys = async () => {
  const response = await api.get('/keys');
  return response.data;
};

export const createApiKey = async (keyData: any) => {
  const response = await api.post('/keys/create', keyData);
  return response.data;
};
