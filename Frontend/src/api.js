
import axios from 'axios';
import { getAuthToken, removeAuthToken, removeUser } from './utils/auth.js';

// Base URL
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      removeUser();
      window.location.href = '/login';
    }

    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error(`Unable to connect to backend at ${API_URL}`);
      return Promise.reject({
        ...error,
        message: `Cannot connect to server at ${API_URL}. Make sure backend is running.`,
      });
    }

    return Promise.reject(error);
  }
);

// ----------------------
// AUTH API (single login for admin & doctor)
// ----------------------
export const authAPI = {
  login: (email, password, role) =>
    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
      role,
    }),

  doctorLogin: (email, password) =>
    axios.post("http://localhost:5000/api/auth/doctorlogin", { email, password }),
};

// ----------------------
// DOCTOR APIs
// ----------------------
export const doctorAPI = {
  getDoctors: () => api.get('/doctors'),
  getDoctor: (id) => api.get(`/doctors/${id}`),
  createDoctor: (data) => api.post('/doctors', data),
  updateDoctor: (id, data) => api.put(`/doctors/${id}`, data),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
  getDoctorsByHospital: (hospitalName) =>
    api.get(`/doctors/hospital/${hospitalName}`),
};

// ----------------------
// MEDICINE APIs
// ----------------------
export const medicineAPI = {
  getMedicines: () => api.get('/medicines'),
  getMedicine: (id) => api.get(`/medicines/${id}`),
  createMedicine: (data) => api.post('/medicines', data),
  updateMedicine: (id, data) => api.put(`/medicines/${id}`, data),
  deleteMedicine: (id) => api.delete(`/medicines/${id}`),
};

// ----------------------
// PATIENT APIs
// ----------------------
export const patientAPI = {
  getAllPatients: () => api.get('/patients'),
  getTodayPatients: () => api.get('/patients/today'),
  getPatient: (id) => api.get(`/patients/${id}`),
  registerPatient: (data) => api.post('/patients', data),
  issuePrescription: (id, data) => api.put(`/patients/${id}/prescription`, data),
};

export default api;
