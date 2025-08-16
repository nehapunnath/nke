import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EnquiryForm = ({ productName = '', onClose = null }) => {
  const location = useLocation();
  const product = location.state?.product || { name: productName };
  
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enquiry submitted:', { ...enquiryForm, product: product.name });
    alert('Thank you for your enquiry! Our sales team will contact you shortly.');
    if (onClose) onClose();
  };

  return (
    <div className={`${onClose ? '' : 'min-h-screen flex items-center justify-center bg-gray-50 p-4'}`}>
      <div className={`bg-white rounded-xl shadow-2xl p-6 ${onClose ? 'max-w-2xl w-full' : 'max-w-4xl w-full'}`}>
        {onClose && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#104016]">Enquire About {product.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-[#104016] transition-colors text-2xl"
              aria-label="Close enquiry form"
            >
              &times;
            </button>
          </div>
        )}
        
        {!onClose && (
          <h2 className="text-3xl font-bold text-[#104016] mb-8 text-center">
            Product Enquiry: {product.name}
          </h2>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">Full Name*</label>
              <input
                type="text"
                name="name"
                required
                value={enquiryForm.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">Email Address*</label>
              <input
                type="email"
                name="email"
                required
                value={enquiryForm.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                required
                value={enquiryForm.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">Company Name</label>
              <input
                type="text"
                name="company"
                value={enquiryForm.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#104016] mb-2">Your Enquiry*</label>
            <textarea
              name="message"
              rows="5"
              required
              value={enquiryForm.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
              placeholder={product.name ? `I'm interested in the ${product.name}. Please provide more information about...` : "Please provide details about your enquiry..."}
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#104016] hover:bg-[#2c7744] text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg text-lg"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;