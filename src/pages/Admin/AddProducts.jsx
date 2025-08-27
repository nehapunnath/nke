import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

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
    catalogue: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
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
    setProductData(prev => ({
      ...prev,
      catalogue: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty specs
      const filteredSpecs = productData.specs.filter(spec => spec.trim() !== '');

      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('brand', productData.brand);
      formData.append('category', productData.category);
      formData.append('price', productData.price);
      formData.append('modelNo', productData.modelNo);
      formData.append('warranty', productData.warranty);
      formData.append('stockStatus', productData.stockStatus);
      formData.append('description', productData.description);
      formData.append('specs', JSON.stringify(filteredSpecs));
      
      // Append images
      productData.images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      
      // Append catalogue if exists
      if (productData.catalogue) {
        formData.append('catalogue', productData.catalogue);
      }

      console.log('Product Data:', Object.fromEntries(formData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Product added successfully!');
      
      // Reset form
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
        catalogue: null
      });
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
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
                      type="text"
                      name="price"
                      value={productData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                      placeholder="e.g., ₹285,000"
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Product Images</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    accept="image/*"
                  />
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

              {/* Catalogue Upload */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Product Catalogue</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Catalogue (PDF)</label>
                  <input
                    type="file"
                    onChange={handleCatalogueUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    accept=".pdf"
                  />
                </div>
                
                {productData.catalogue && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Selected file: {productData.catalogue.name}</p>
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