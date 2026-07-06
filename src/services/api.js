import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getLeads(stage) {
  const params = stage && stage !== 'All' ? { stage } : {};
  const response = await apiClient.get('/leads/', { params });
  return response.data;
}

export async function getLead(id) {
  const response = await apiClient.get(`/leads/${id}/`);
  return response.data;
}

export async function createLead(payload) {
  const response = await apiClient.post('/leads/', payload);
  return response.data;
}

export async function updateLead(id, payload) {
  const response = await apiClient.patch(`/leads/${id}/`, payload);
  return response.data;
}

export async function deleteLead(id) {
  const response = await apiClient.delete(`/leads/${id}/`);
  return response.data;
}

export default apiClient;
