import axios from 'axios';
import BASE_URL from './base_url';

const productApi = axios.create({
  baseURL: BASE_URL,
});

productApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProductsForUsers = async () => {
  try {
    const response = await productApi.get('/products', { skipAuth: true }); // Skip auth if public
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
        error.response.data.error ||
        `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch products');
    }
  }
};

// Add product with file uploads
export const addProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('brand', productData.brand);
    formData.append('category', productData.category);
    formData.append('price', productData.price);
    formData.append('modelNo', productData.modelNo);
    formData.append('warranty', productData.warranty);
    formData.append('stockStatus', productData.stockStatus);
    formData.append('description', productData.description);
    formData.append('specs', JSON.stringify(productData.specs));

    productData.images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await productApi.post('/admin/products/add', formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
        error.response.data.error ||
        `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to add product');
    }
  }
};

// Upload category catalogue
export const uploadCategoryCatalogue = async (category, catalogueFile) => {
  try {
    const formData = new FormData();
    formData.append('category', category);
    formData.append('categoryCatalogue',catalogueFile )

    const response = await productApi.post('/admin/category-catalogue/upload', formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
        error.response.data.error ||
        `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to upload category catalogue');
    }
  }
};

// Get category catalogue
export const getCategoryCatalogue = async (category) => {
  try {
    const response = await productApi.get(`/category-catalogue/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch category catalogue';
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await productApi.get('/admin/products/all');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch products';
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await productApi.get(`/admin/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch product';
  }
};

// Update product
export const updateProduct = async (id, updates) => {
  try {
    const response = await productApi.put(`/admin/products-edit/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update product';
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await productApi.delete(`/admin/products-del/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to delete product';
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await productApi.get(`/category/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch products by category';
  }
};

export default productApi;