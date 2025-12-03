// src/services/api.ts
import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken, removeAuthToken, removeUser } from '../utils/auth';


// Base URL from environment variable
const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAuthToken();
    if (token) {
      if (!config.headers) config.headers = {} as InternalAxiosRequestConfig['headers'];
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Auth API ---
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  registerAdmin: (name: string, email: string, password: string) =>
    api.post('/auth/register-admin', { name, email, password }),
  getMe: () => api.get('/auth/me'),
};

// --- Doctor API ---
export const doctorAPI = {
  getDoctors: () => api.get('/doctors'),
  getDoctor: (id: string) => api.get(`/doctors/${id}`),
  createDoctor: (data: Record<string, any>) => api.post('/doctors', data),
  updateDoctor: (id: string, data: Record<string, any>) => api.put(`/doctors/${id}`, data),
  deleteDoctor: (id: string) => api.delete(`/doctors/${id}`),
  getDoctorsByHospital: (hospitalName: string) => api.get(`/doctors/hospital/${hospitalName}`),
};

// --- Medicine API ---
export const medicineAPI = {
  getMedicines: () => api.get('/medicines'),
  getMedicine: (id: string) => api.get(`/medicines/${id}`),
  createMedicine: (data: Record<string, any>) => api.post('/medicines', data),
  updateMedicine: (id: string, data: Record<string, any>) => api.put(`/medicines/${id}`, data),
  deleteMedicine: (id: string) => api.delete(`/medicines/${id}`),
};

// --- Patient API ---
export const patientAPI = {
  getAllPatients: () => api.get('/patients'),
  getTodayPatients: () => api.get('/patients/today'),
  getPatient: (id: string) => api.get(`/patients/${id}`),
  registerPatient: (data: Record<string, any>) => api.post('/patients', data),
  issuePrescription: (id: string, data: Record<string, any>) =>
    api.put(`/patients/${id}/prescription`, data),
};

export default api;
