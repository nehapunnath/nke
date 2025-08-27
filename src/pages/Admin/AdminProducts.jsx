import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sample product data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Dell Precision 7680 Mobile Workstation',
          brand: 'Dell',
          category: 'Laptops',
          price: '₹285,000',
          modelNo: 'Precision 7680',
          warranty: '3 Years ProSupport Plus',
          stockStatus: 'In Stock',
          description: 'High-performance mobile workstation for professionals.',
          images: ['https://via.placeholder.com/300x200?text=Dell+Laptop'],
          specs: ['Processor: 13th Gen Intel® Core™ i9-13950HX', 'RAM: 64GB DDR5', 'Storage: 2TB NVMe SSD']
        },
        {
          id: 2,
          name: 'HP LaserJet Pro M404n',
          brand: 'HP',
          category: 'Printers',
          price: '₹45,000',
          modelNo: 'M404n',
          warranty: '1 Year On-site',
          stockStatus: 'In Stock',
          description: 'Monochrome laser printer for office use.',
          images: ['https://via.placeholder.com/300x200?text=HP+Printer'],
          specs: ['Print Speed: Up to 40 ppm', 'Resolution: 600 x 600 dpi']
        },
        {
          id: 3,
          name: 'Epson EB-E01',
          brand: 'Epson',
          category: 'Projectors',
          price: '₹62,000',
          modelNo: 'EB-E01',
          warranty: '2 Years',
          stockStatus: 'Out of Stock',
          description: 'Portable projector for presentations and home entertainment.',
          images: ['https://via.placeholder.com/300x200?text=Epson+Projector'],
          specs: ['Brightness: 3,300 lumens', 'Resolution: XGA (1024 x 768)']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleEditProduct = (productId) => {
    // In a real app, this would navigate to an edit page
    alert(`Edit product with ID: ${productId}`);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(product => product.id !== selectedProduct.id));
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Pre Order': return 'bg-yellow-100 text-yellow-800';
      case 'Back Order': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>
            <a 
              href="/admin/products/new" 
              className="px-6 py-3 bg-[#104016] text-white rounded-lg hover:bg-[#2c7744] transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Product
            </a>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.brand} - {product.modelNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.stockStatus)}`}>
                          {product.stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditProduct(product.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {products.length === 0 && !loading && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center mt-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-gray-500">Get started by adding a new product.</p>
              <div className="mt-6">
                <a
                  href="/admin/add-product"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#104016] hover:bg-[#2c7744] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#104016]"
                >
                  Add Product
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* View Product Modal */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="rounded-lg w-full h-64 object-contain" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h4>
                  <p className="text-gray-600">{selectedProduct.brand} • {selectedProduct.modelNo}</p>
                  <div className="mt-4">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedProduct.stockStatus)}`}>
                      {selectedProduct.stockStatus}
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-[#104016]">{selectedProduct.price}</p>
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900">Category</h5>
                    <p className="text-gray-600">{selectedProduct.category}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900">Warranty</h5>
                    <p className="text-gray-600">{selectedProduct.warranty}</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Description</h5>
                <p className="text-gray-600">{selectedProduct.description}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Specifications</h5>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  {selectedProduct.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete {selectedProduct.name}?</h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;