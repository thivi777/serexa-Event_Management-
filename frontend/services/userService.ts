import api from '../lib/api';

export const getUserPreferences = async () => {
  const response = await api.get('/user/preferences');
  return response.data;
};

export const updatePreferences = async (preferences: any) => {
  const response = await api.post('/user/preferences', preferences);
  return response.data;
};
