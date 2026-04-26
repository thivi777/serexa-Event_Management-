import api from '../lib/api';

export const getAllProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const remixProject = async (projectId: string) => {
  const response = await api.post('/projects/remix', { projectId });
  return response.data;
};

export const chatWithAgent = async (message: string) => {
  const response = await api.post('/projects/chat', { message });
  return response.data;
};
