import axios from 'axios';
import BASE_URL from './base_url';


const enquiryApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

enquiryApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await enquiryApi.post('/enquiry', enquiryData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to submit enquiry';
  }
};

export const getEnquiries = async () => {
  try {
    const response = await enquiryApi.get('/admin/enquiries');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch enquiries';
  }
};

export const updateEnquiryStatus = async (id, status) => {
  try {
    const response = await enquiryApi.put(`/admin/enquiries/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update enquiry status';
  }
};

export default enquiryApi;