import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitEnquiry } from '../services/enquiryApi';

const EnquiryForm = ({ productName = '', onClose = null }) => {
  const location = useLocation();
  const product = location.state?.product || { name: productName };

  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!enquiryForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!enquiryForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(enquiryForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!enquiryForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(enquiryForm.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }
    if (!enquiryForm.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (enquiryForm.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    if (!product.name) {
      newErrors.product = 'Product name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccess(null);

    try {
      const response = await submitEnquiry({
        ...enquiryForm,
        product: product.name,
      });
      setSuccess('Thank you for your enquiry! Our sales team will contact you shortly.');
      setEnquiryForm({ name: '', email: '', phone: '', company: '', message: '' });
      setErrors({});
      if (onClose) setTimeout(onClose, 2000); // Close modal after 2 seconds
    } catch (error) {
      setErrors({ submit: error || 'Failed to submit enquiry. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${
        onClose ? '' : 'min-h-screen flex items-center justify-center bg-gray-50 p-4'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`bg-white rounded-xl shadow-2xl p-6 ${
          onClose ? 'max-w-2xl w-full' : 'max-w-4xl w-full'
        }`}
      >
        {onClose && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#104016]">
              Enquire About {product.name || 'Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-[#104016] transition-colors text-2xl"
              aria-label="Close enquiry form"
              disabled={isLoading}
            >
              &times;
            </button>
          </div>
        )}

        {!onClose && (
          <h2 className="text-3xl font-bold text-[#104016] mb-8 text-center">
            Product Enquiry: {product.name || 'Product'}
          </h2>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">
                Full Name*
              </label>
              <input
                type="text"
                name="name"
                value={enquiryForm.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={enquiryForm.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phone"
                value={enquiryForm.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#104016] mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={enquiryForm.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016]"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#104016] mb-2">
              Your Enquiry*
            </label>
            <textarea
              name="message"
              rows="5"
              value={enquiryForm.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104016] ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={
                product.name
                  ? `I'm interested in the ${product.name}. Please provide more information about...`
                  : 'Please provide details about your enquiry...'
              }
              disabled={isLoading}
              required
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {errors.product && (
            <p className="text-sm text-red-600">{errors.product}</p>
          )}

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-[#104016] hover:bg-[#2c7744] text-white py-3 px-8 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EnquiryForm;