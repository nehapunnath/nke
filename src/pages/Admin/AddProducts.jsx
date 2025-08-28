import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { addProduct, uploadCategoryCatalogue } from '../../services/productApi';

const AddProducts = () => {
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
    specs: [''],
    categoryCatalogue: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
        images: [...prev.images, ...validFiles]
      }));
    }
  };

  const removeImage = (index) => {
    const newImages = productData.images.filter((_, i) => i !== index);
    setProductData(prev => ({
      ...prev,
      images: newImages
    }));
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
      // Validate required fields
      if (!productData.name || !productData.brand || !productData.category || 
          !productData.price || !productData.modelNo || !productData.warranty || 
          !productData.description) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Validate images
      if (productData.images.length === 0) {
        setError('Please upload at least one product image');
        setIsSubmitting(false);
        return;
      }

      // Filter out empty specs
      const filteredSpecs = productData.specs.filter(spec => spec.trim() !== '');

      // Prepare product data
      const productPayload = {
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        price: productData.price,
        modelNo: productData.modelNo,
        warranty: productData.warranty,
        stockStatus: productData.stockStatus,
        description: productData.description,
        images: productData.images,
        specs: filteredSpecs
      };

      // Add product
      const productResult = await addProduct(productPayload);

      if (productResult.success) {
        // Handle category catalogue upload if provided
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

        alert('Product added successfully!');
        setProductData({
          name: '',
          brand: '',
          category: '',
          price: '',
          modelNo: '',
          warranty: '',
          stockStatus: 'In Stock',
          description: '',
          images: [],
          specs: [''],
          categoryCatalogue: null
        });
      } else {
        setError(productResult.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      let errorMessage = 'Error adding product. Please try again.';
      
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
      
      const errorString = String(error).toLowerCase();
      if (errorString.includes('token') || errorString.includes('auth') || errorString.includes('401')) {
        alert('Your session has expired. Please login again.');
        // Redirect to login
        // window.location.href = '/admin/login';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Fill in the details below to add a new product to your catalog</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Product Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
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

              {/* Description */}
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

              {/* Image Upload */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Product Images *</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Max 10 images)</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, WEBP. Max 5MB per image.</p>
                </div>
                
                {productData.images.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {productData.images.map((image, index) => (
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

              {/* Category Catalogue Upload */}
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
                
                {productData.categoryCatalogue && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Selected file for {productData.category}: {productData.categoryCatalogue.name}
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

              {/* Specifications */}
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

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#104016] text-white rounded-lg hover:bg-[#2c7744] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProducts;