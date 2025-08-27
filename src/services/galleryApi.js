import axios from 'axios';
import BASE_URL from './base_url';

const galleryApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Allow multipart/form-data for specific requests (e.g., image upload)
  if (config.isFormData) {
    delete config.headers['Content-Type']; // Let browser set multipart boundary
  }
  return config;
});


// Gallery APIs
export const addImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const response = await galleryApi.post('/admin/gallery', formData, {
      isFormData: true, // Flag for multipart request
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to upload image';
  }
};

export const getImages = async () => {
  try {
    const response = await api.get('/admin/gallery');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch images';
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await galleryApi.delete(`/admin/gallery/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to delete image';
  }
};

export default galleryApi;