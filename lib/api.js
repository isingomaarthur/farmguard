import axios from 'axios';
import { getAuthHeader } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const authHeader = getAuthHeader();
  if (authHeader.Authorization) {
    config.headers.Authorization = authHeader.Authorization;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = error.response?.data;
    const message = payload?.message || payload?.error || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

class APIClient {
  async request(endpoint, options = {}) {
    try {
      const response = await client({ url: endpoint, ...options });
      return response;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options) {
    return this.request(endpoint, { ...options, method: 'POST', data });
  }

  patch(endpoint, data, options) {
    return this.request(endpoint, { ...options, method: 'PATCH', data });
  }

  delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new APIClient();

// Sensor APIs
export const sensorAPI = {
  getReadings: () => api.get('/sensors/readings'),
  getReadingsByType: (type, params) => api.get(`/sensors/readings/${type}`, { params }),
  getAllSensors: () => api.get('/sensors'),
  getSensorByNodeId: (nodeId) => api.get(`/sensors/${nodeId}`),
  postReading: (data) => api.post('/sensors/reading', data),
};

// Alert APIs
export const alertAPI = {
  getAlerts: (params) => api.get('/alerts', { params }),
  getAlertCount: () => api.get('/alerts/unread/count'),
  getAlertById: (id) => api.get(`/alerts/${id}`),
  createAlert: (data) => api.post('/alerts', data),
  markAsRead: (id) => api.patch(`/alerts/${id}/read`, {}),
  resolveAlert: (id) => api.patch(`/alerts/${id}/resolve`, {}),
  deleteAlert: (id) => api.delete(`/alerts/${id}`),
};

// Report APIs
export const reportAPI = {
  getWeeklySummary: () => api.get('/reports/weekly-summary'),
  getReportData: (period) => api.get(`/reports/data/${period}`),
  getAlertDistribution: () => api.get('/reports/alerts/distribution'),
  getDailyTrends: () => api.get('/reports/trends/daily'),
};

// Node APIs
export const nodeAPI = {
  getAllNodes: () => api.get('/nodes'),
  getNodeById: (nodeId) => api.get(`/nodes/${nodeId}`),
  createNode: (data) => api.post('/nodes', data),
  updateNodePosition: (nodeId, data) => api.patch(`/nodes/${nodeId}/position`, data),
  updateNodeStatus: (nodeId, data) => api.patch(`/nodes/${nodeId}/status`, data),
};

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout', {}),
};

export const userAPI = {
  getAllUsers: () => api.get('/users'),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
};

export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
};
