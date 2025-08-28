import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/AdminSidebar';
import { getAllProducts, deleteProduct } from '../../services/productApi';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Categories (same as in EditProducts.jsx)
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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await getAllProducts();
        if (response.success) {
          // Convert Firebase object to array with IDs
          const productsArray = response.products
            ? Object.keys(response.products).map(id => ({
                id,
                ...response.products[id]
              }))
            : [];
          setProducts(productsArray);
        } else {
          setError(response.message || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
        if (err.message?.toLowerCase().includes('token') || err.message?.includes('401')) {
          alert('Your session has expired. Please login again.');
          navigate('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.modelNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeProductDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setError('');
        const response = await deleteProduct(productId);
        if (response.success) {
          setProducts(products.filter(product => product.id !== productId));
          alert('Product deleted successfully!');
        } else {
          setError(response.message || 'Failed to delete product');
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        setError(err.message || 'Failed to delete product');
        if (err.message?.toLowerCase().includes('token') || err.message?.includes('401')) {
          alert('Your session has expired. Please login again.');
          navigate('/admin/login');
        }
      }
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104016] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">View Products</h1>
            <p className="text-gray-600">Manage and view all products in your catalog</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                  placeholder="Search by name, brand, or model..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No products found. Try adjusting your search filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 object-contain"
                                src={product.images && product.images[0]?.url}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.brand} - {product.modelNo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{product.price.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-800' : 
                              product.stockStatus === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                            {product.stockStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openProductDetails(product)}
                            className="text-[#104016] hover:text-[#2c7744] mr-3"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditProduct(product.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Detail Modal */}
      {isDetailModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                <button
                  onClick={closeProductDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Images */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProduct.images && selectedProduct.images.length > 0 ? (
                      selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="w-full h-48 object-contain border rounded-md"
                        />
                      ))
                    ) : (
                      <p className="text-gray-500">No images available</p>
                    )}
                  </div>
                </div>

                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Name:</span> {selectedProduct.name}
                    </div>
                    <div>
                      <span className="font-medium">Brand:</span> {selectedProduct.brand}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {selectedProduct.category}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </div>
                    <div>
                      <span className="font-medium">Model No:</span> {selectedProduct.modelNo}
                    </div>
                    <div>
                      <span className="font-medium">Warranty:</span> {selectedProduct.warranty}
                    </div>
                    <div>
                      <span className="font-medium">Stock Status:</span> 
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${selectedProduct.stockStatus === 'In Stock' ? 'bg-green-100 text-green-800' : 
                          selectedProduct.stockStatus === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                        {selectedProduct.stockStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedProduct.description}</p>
              </div>

              {/* Specifications */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>
                {selectedProduct.specs && selectedProduct.specs.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedProduct.specs.map((spec, index) => (
                      <li key={index} className="text-gray-700">{spec}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specifications available</p>
                )}
              </div>

              {/* Catalogue */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Catalogue</h3>
                <button
                  onClick={() => navigate(`/category-catalogue/${encodeURIComponent(selectedProduct.category)}`)}
                  className="text-[#104016] hover:text-[#2c7744] underline"
                >
                  View Catalogue
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeProductDetails}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleEditProduct(selectedProduct.id)}
                  className="px-4 py-2 bg-[#104016] text-white rounded-md hover:bg-[#2c7744] transition-colors"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;