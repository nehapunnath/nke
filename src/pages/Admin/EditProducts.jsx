import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/AdminSidebar';
import { getProductById, updateProduct, uploadCategoryCatalogue, getCategoryCatalogue } from '../../services/productApi';

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    modelNo: '',
    warranty: '',
    stockStatus: 'In Stock',
    description: '',
    images: [],
    newImages: [],
    specs: [''],
    categoryCatalogue: null
  });
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [existingCatalogue, setExistingCatalogue] = useState(null);

  const categories = [
    'Desktops',
    'Laptops',
    'Printers',
    'Projectors',
    'Interactive Panels',
    'Scanners',
    'CCTV Systems',
    'UPS Systems',
    'Accessories'
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await getProductById(id);
        if (response.success) {
          const product = response.product;
          setProductData({
            name: product.name || '',
            brand: product.brand || '',
            category: product.category || '',
            price: product.price || '',
            modelNo: product.modelNo || '',
            warranty: product.warranty || '',
            stockStatus: product.stockStatus || 'In Stock',
            description: product.description || '',
            images: product.images || [],
            newImages: [],
            specs: product.specs.length > 0 ? product.specs : [''],
            categoryCatalogue: null
          });
          setExistingImages(product.images || []);
          
          try {
            const catalogueResponse = await getCategoryCatalogue(product.category);
            if (catalogueResponse.success) {
              setExistingCatalogue(catalogueResponse.catalogue);
            } else {
              setExistingCatalogue(null);
            }
          } catch (catalogueErr) {
            setExistingCatalogue(null);
          }
        } else {
          setError(response.message || 'Failed to fetch product');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecChange = (index, value) => {
    const newSpecs = [...productData.specs];
    newSpecs[index] = value;
    setProductData(prev => ({
      ...prev,
      specs: newSpecs
    }));
  };

  const addSpecField = () => {
    setProductData(prev => ({
      ...prev,
      specs: [...prev.specs, '']
    }));
  };

  const removeSpecField = (index) => {
    if (productData.specs.length > 1) {
      const newSpecs = productData.specs.filter((_, i) => i !== index);
      setProductData(prev => ({
        ...prev,
        specs: newSpecs
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setError('');
      setProductData(prev => ({
        ...prev,
        newImages: [...prev.newImages, ...validFiles]
      }));
    }
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const newExistingImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(newExistingImages);
      setProductData(prev => ({
        ...prev,
        images: newExistingImages
      }));
    } else {
      const newImages = productData.newImages.filter((_, i) => i !== index);
      setProductData(prev => ({
        ...prev,
        newImages
      }));
    }
  };

  const handleCatalogueUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file for the category catalogue');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Catalogue size should be less than 10MB');
        return;
      }
      if (!productData.category) {
        setError('Please select a category before uploading a catalogue');
        return;
      }
      
      setProductData(prev => ({
        ...prev,
        categoryCatalogue: file
      }));
      setError('');
    }
  };

  const removeCatalogue = () => {
    setProductData(prev => ({
      ...prev,
      categoryCatalogue: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!productData.name || !productData.brand || !productData.category || 
          !productData.price || !productData.modelNo || !productData.warranty || 
          !productData.description) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const filteredSpecs = productData.specs.filter(spec => spec.trim() !== '');

      const productUpdates = {
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        price: parseFloat(productData.price) || 0,
        modelNo: productData.modelNo,
        warranty: productData.warranty,
        stockStatus: productData.stockStatus,
        description: productData.description,
        specs: filteredSpecs,
        existingImages: existingImages
      };

      const formData = new FormData();
      Object.keys(productUpdates).forEach(key => {
        if (key === 'specs' || key === 'existingImages') {
          formData.append(key, JSON.stringify(productUpdates[key]));
        } else {
          formData.append(key, productUpdates[key]);
        }
      });

      productData.newImages.forEach(image => {
        formData.append('images', image);
      });

      for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key} = ${value}`);
      }

      const productResult = await updateProduct(id, formData);

      if (productResult.success) {
        if (productData.categoryCatalogue) {
          try {
            const catalogueResult = await uploadCategoryCatalogue(
              productData.category,
              productData.categoryCatalogue
            );
            if (!catalogueResult.success) {
              setError(catalogueResult.message || 'Failed to upload category catalogue');
            }
          } catch (catalogueError) {
            setError(catalogueError.message || 'Failed to upload category catalogue');
          }
        }

        alert('Product updated successfully!');
        navigate('/admin/products');
      } else {
        setError(productResult.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      let errorMessage = 'Error updating product. Please try again.';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setError(errorMessage);
      
      if (error.message?.toLowerCase().includes('token') || 
          error.message?.toLowerCase().includes('auth') || 
          error.message?.includes('401')) {
        alert('Your session has expired. Please login again.');
        navigate('/admin/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104016] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Update the details below to edit the product</p>
          </div>
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., Dell Precision 7680 Mobile Workstation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      value={productData.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., Dell, HP, Lenovo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={productData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={productData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., 285000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model Number *</label>
                    <input
                      type="text"
                      name="modelNo"
                      value={productData.modelNo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., Precision 7680"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warranty *</label>
                    <input
                      type="text"
                      name="warranty"
                      value={productData.warranty}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., 3 Years ProSupport Plus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status *</label>
                    <select
                      name="stockStatus"
                      value={productData.stockStatus}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Pre Order">Pre Order</option>
                      <option value="Back Order">Back Order</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                  placeholder="Enter detailed product description..."
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Product Images</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Images (Max 10 images)</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, WEBP. Max 5MB per image.</p>
                </div>
                {existingImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Existing Images:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative border rounded-md p-2">
                          <img 
                            src={image.url} 
                            alt={image.originalName}
                            className="h-24 object-contain w-full"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, true)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {productData.newImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">New Images:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {productData.newImages.map((image, index) => (
                        <div key={index} className="relative border rounded-md p-2">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Preview ${index}`}
                            className="h-24 object-contain w-full"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Category Catalogue (Optional)</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Category Catalogue PDF
                  </label>
                  <input
                    type="file"
                    onChange={handleCatalogueUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    accept=".pdf"
                    disabled={!productData.category}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    PDF files only. Max 10MB. Select a category first to upload a catalogue for that category.
                  </p>
                </div>
                {existingCatalogue && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Current catalogue for {productData.category}: {existingCatalogue.catalogue.originalName}
                      <a
                        href={existingCatalogue.catalogue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-900 underline"
                      >
                        View
                      </a>
                    </p>
                  </div>
                )}
                {productData.categoryCatalogue && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      New catalogue selected: {productData.categoryCatalogue.name}
                    </p>
                    <button
                      type="button"
                      onClick={removeCatalogue}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Specifications</h2>
                {productData.specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleSpecChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., Processor: 13th Gen Intel® Core™ i9-13950HX"
                    />
                    {productData.specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpecField}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  + Add Specification
                </button>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#104016] text-white rounded-lg hover:bg-[#2c7744] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Updating Product...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProducts;