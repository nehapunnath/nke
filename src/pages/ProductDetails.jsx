import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState('');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  // Sample product data
  const product = {
    id: '1',
    name: 'Dell Precision 7680 Mobile Workstation',
    brand: 'Dell',
    category: 'Mobile Workstation',
    images: [
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/workstations/mobile-workstations/precision/16-7680/media-gallery/notebook-precision-7680-gray-gallery-10.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=565&qlt=100,1&resMode=sharp2&size=565,402&chrss=full',
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/workstations/mobile-workstations/precision/16-7680/media-gallery/notebook-precision-7680-gray-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=565&qlt=100,1&resMode=sharp2&size=565,402&chrss=full',
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/workstations/mobile-workstations/precision/16-7680/media-gallery/notebook-precision-7680-gray-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=565&qlt=100,1&resMode=sharp2&size=565,402&chrss=full'
    ],
    price: '₹285,000',
    specs: [
      'Processor: 13th Gen Intel® Core™ i9-13950HX (36MB cache, 24 cores, 32 threads, up to 5.50 GHz Turbo)',
      'Operating System: Windows 11 Pro, English',
      'Graphics: NVIDIA® RTX™ 5000 Ada Generation Laptop GPU 16GB GDDR6',
      'Memory: 64GB DDR5 4800MHz (2x32GB)',
      'Storage: 2TB M.2 PCIe NVMe SSD',
      'Display: 16" UHD+ (3840 x 2400) 60Hz, Anti-Glare, Touch, 100% AdobeRGB, 500 nits, ComfortView Plus',
      'Ports: 4x Thunderbolt™ 4 (USB Type-C®), 2x USB 3.2 Gen 1, HDMI 2.1, SD card slot, headset jack',
      'Wireless: Intel® Killer™ Wi-Fi 6E AX211 + Bluetooth 5.2',
      'Dimensions: 357.8 x 251.5 x 25.3 mm (14.09 x 9.90 x 1.00 in)',
      'Weight: Starting at 2.34 kg (5.16 lb)'
    ],
    description: 'The Dell Precision 7680 Mobile Workstation is engineered for professionals who demand desktop-class performance in a mobile form factor. Featuring the latest Intel Core processors and NVIDIA RTX graphics, this workstation delivers exceptional performance for CAD, 3D modeling, video editing, and data science applications. The stunning 16" UHD+ display with 100% AdobeRGB coverage ensures accurate color reproduction for creative work, while the durable chassis meets MIL-STD-810H standards for reliability in demanding environments.',
    modelNo: 'Precision 7680',
    warranty: '3 Years ProSupport Plus with Next Business Day Onsite Service',
    stockStatus: 'In Stock (Available for immediate delivery)'
  };

  // Set the first image as selected by default
  if (!selectedImage && product.images.length > 0) {
    setSelectedImage(product.images[0]);
  }

  const toggleEnquiryModal = () => {
    setShowEnquiryModal(!showEnquiryModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enquiry submitted:', enquiryForm);
    alert('Thank you for your enquiry! Our sales team will contact you shortly.');
    setShowEnquiryModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Product Details Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="md:w-1/2 p-6">
                  <div className="mb-6 border-2 border-[#e5e7eb] rounded-xl p-4 flex justify-center bg-white">
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="h-80 w-full object-contain"
                    />
                  </div>
                  <div className="flex gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`border-2 rounded-lg p-1 transition-all ${selectedImage === img ? 'border-[#104016] ring-2 ring-[#ffd2a8]' : 'border-gray-200 hover:border-[#104016]'}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:w-1/2 p-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-[#104016] bg-[#e8f5e9] px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-[#104016] mb-2">{product.name}</h1>
                  <div className="text-gray-600 mb-4">{product.brand}</div>
                  
                  <div className="bg-[#f5f5f5] border-l-4 border-[#104016] p-4 mb-6 rounded-r-lg">
                    <div className="text-2xl font-bold text-[#104016]">{product.price}</div>
                    <div className="text-[#2c7744] font-medium">{product.stockStatus}</div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-[#104016] mb-3 border-b pb-2">Product Details</h2>
                    <ul className="space-y-2">
                      <li className="flex">
                        <span className="font-medium text-gray-700 w-32">Model No:</span>
                        <span>{product.modelNo}</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium text-gray-700 w-32">Warranty:</span>
                        <span>{product.warranty}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-[#104016] mb-3 border-b pb-2">Specifications</h2>
                    <ul className="space-y-2">
                      {product.specs.map((spec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#ffd2a8] mr-2">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={toggleEnquiryModal}
                    className="w-full bg-[#104016] hover:bg-[#2c7744] text-white py-3 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>

              {/* Description Section */}
              <div className="p-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-[#104016] mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry Modal */}
        {showEnquiryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#104016]">Enquire About This Product</h2>
                <button 
                  onClick={toggleEnquiryModal}
                  className="text-gray-500 hover:text-[#104016] transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#104016] mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={enquiryForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#104016] focus:border-[#104016]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#104016] mb-1">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={enquiryForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#104016] focus:border-[#104016]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#104016] mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={enquiryForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#104016] focus:border-[#104016]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#104016] mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={enquiryForm.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#104016] focus:border-[#104016]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#104016] mb-1">Your Enquiry*</label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={enquiryForm.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#104016] focus:border-[#104016]"
                    placeholder={`I'm interested in the ${product.name}. Please provide more information about...`}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#104016] hover:bg-[#2c7744] text-white py-3 rounded-md transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetails;