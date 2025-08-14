import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#104016] to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full  opacity-5 bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#222222] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About NKE Infinity Tech Solutions
            </motion.h1>
            <motion.p 
              className="text-xl text-[#425333] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your trusted partner for all IT hardware solutions
            </motion.p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-8 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#104016] mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2024, NKE Infinity Tech Solutions LLP has grown from a small computer hardware retailer to a leading provider of comprehensive IT solutions in Bengaluru.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a passion for technology among our founders has transformed into a business serving hundreds of satisfied customers across Karnataka.
                </p>
                <p className="text-gray-700">
                  Today, we pride ourselves on delivering quality products, exceptional service, and tailored solutions for both individual and corporate clients.
                </p>
              </motion.div>
              <motion.div 
                className="md:w-1/2 md:pl-12"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                  alt="Our Showroom" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#104016] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Mission & Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#104016] text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  To provide reliable, high-quality IT hardware solutions that empower businesses and individuals to achieve their goals through technology.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#104016] text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Our Vision</h3>
                <p className="text-gray-700">
                  To be Bengaluru's most trusted IT solutions provider, known for our expertise, customer service, and innovative approach.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#104016] text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Core Values</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Customer-Centric Approach</li>
                  <li>Integrity in All Dealings</li>
                  <li>Technical Excellence</li>
                  <li>Continuous Innovation</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#104016] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose NKE Infinity Tech?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gradient-to-br from-[#f8f8f8] to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <div className="bg-[#104016] text-white p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#425333] mb-3">Quality Products</h3>
                    <p className="text-gray-700">
                      We source only the highest quality IT hardware from trusted manufacturers, ensuring reliability and performance for all our customers.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-[#f8f8f8] to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <div className="bg-[#104016] text-white p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#425333] mb-3">Expert Support</h3>
                    <p className="text-gray-700">
                      Our team of certified technicians provides unparalleled technical support and guidance to help you make the right purchasing decisions.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-[#f8f8f8] to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <div className="bg-[#104016] text-white p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#425333] mb-3">Competitive Pricing</h3>
                    <p className="text-gray-700">
                      We offer the best value in the market with competitive pricing and special deals for bulk orders and corporate clients.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-[#f8f8f8] to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <div className="bg-[#104016] text-white p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#425333] mb-3">After-Sales Service</h3>
                    <p className="text-gray-700">
                      Our relationship doesn't end with the sale - we provide comprehensive after-sales support and warranty services.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;