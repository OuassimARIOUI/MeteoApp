// Configuration API - utilise les variables d'environnement
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  cities: `${API_BASE_URL}/api/cities`,
  weather: `${API_BASE_URL}/api/weather`
};
