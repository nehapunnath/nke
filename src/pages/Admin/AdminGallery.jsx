import React, { useState, useCallback } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

const AdminGallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      name: 'Mountain Landscape',
      size: '2.5 MB',
      date: 'June 12, 2023',
      url: 'https://images.unsplash.com/photo-1682687980961-78fa83781450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      name: 'City Skyline',
      size: '3.1 MB',
      date: 'July 5, 2023',
      url: 'https://images.unsplash.com/photo-1699968230221-661f83c5afaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      name: 'Sunset Beach',
      size: '2.8 MB',
      date: 'August 18, 2023',
      url: 'https://images.unsplash.com/photo-1699057333226-ca1b3b3b5c15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },

  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileUpload = useCallback(async (files) => {
    setIsUploading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add new images to the gallery
    const newImages = files.map((file, index) => ({
      id: images.length + index + 1,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      url: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setIsUploading(false);
    alert(`${files.length} image(s) uploaded successfully!`);
  }, [images.length]);

  const handleDeleteImage = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(image => image.id !== id));
    }
  }, []);

  const handleDownloadImage = useCallback(async (image) => {
    // In a real app, this would download the actual file
    // For demo purposes, we'll just simulate it
    const a = document.createElement('a');
    a.href = image.url;
    a.download = image.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
            <p className="text-gray-600">Manage and view all product images</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Images</h2>
            <p className="text-gray-600 mb-4">Supported formats: JPG, PNG, GIF</p>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragOver ? 'border-[#104016] bg-green-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="flex flex-col items-center justify-center">
                <svg 
                  className={`w-12 h-12 mb-4 ${dragOver ? 'text-[#104016]' : 'text-gray-400'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="text-lg text-gray-600 mb-2">Drag & Drop your files here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <button 
                  className="px-4 py-2 bg-[#104016] text-white rounded-md hover:bg-[#2c7744] transition-colors flex items-center"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Browse Files
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">All Images ({filteredImages.length})</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
             
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No images found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or upload new images.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{image.name}</h3>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>{image.size}</span>
                      <span>{image.date}</span>
                    </div>
                    <div className="flex justify-between mt-4">

                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminGallery;