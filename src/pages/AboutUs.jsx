import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#ffd2a8] py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#104016] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Nke Infinity Tech Solutions
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
                  Founded in 2024, Nke Infinity Tech Solutions LLP has grown from a small computer hardware retailer to a leading provider of comprehensive IT solutions in Bengaluru.
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
                  src="https://via.placeholder.com/600x400?text=Our+Showroom" 
                  alt="Our Showroom" 
                  className="rounded-lg shadow-md w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-[#f5f5f5]">
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
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  To provide reliable, high-quality IT hardware solutions that empower businesses and individuals to achieve their goals through technology.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Our Vision</h3>
                <p className="text-gray-700">
                  To be Bengaluru's most trusted IT solutions provider, known for our expertise, customer service, and innovative approach.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-4xl mb-4">✓</div>
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

        {/* Our Expertise Section */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#104016] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Expertise
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-[#f5f5f5] p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-5xl mb-4">💻</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Computers & Laptops</h3>
                <p className="text-gray-700">
                  High-performance systems for all your computing needs
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#f5f5f5] p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-5xl mb-4">🖨️</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Printers & MFPs</h3>
                <p className="text-gray-700">
                  Reliable printing solutions for home and office
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#f5f5f5] p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-5xl mb-4">📽️</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Projectors</h3>
                <p className="text-gray-700">
                  High-quality projection for presentations and entertainment
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#f5f5f5] p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-[#104016] text-5xl mb-4">👆</div>
                <h3 className="text-xl font-semibold text-[#425333] mb-3">Interactive Panels</h3>
                <p className="text-gray-700">
                  Cutting-edge touch solutions for collaborative environments
                </p>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Why Choose Us Section */}
        <section className="py-16 bg-[#104016] text-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose Nke Infinity Tech?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-[#425333] p-6 rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-[#ffd2a8] mr-3">✓</span> Quality Products
                </h3>
                <p>
                  We source only the highest quality IT hardware from trusted manufacturers, ensuring reliability and performance for all our customers.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#425333] p-6 rounded-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-[#ffd2a8] mr-3">✓</span> Expert Support
                </h3>
                <p>
                  Our team of certified technicians provides unparalleled technical support and guidance to help you make the right purchasing decisions.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#425333] p-6 rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-[#ffd2a8] mr-3">✓</span> Competitive Pricing
                </h3>
                <p>
                  We offer the best value in the market with competitive pricing and special deals for bulk orders and corporate clients.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#425333] p-6 rounded-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-[#ffd2a8] mr-3">✓</span> After-Sales Service
                </h3>
                <p>
                  Our relationship doesn't end with the sale - we provide comprehensive after-sales support and warranty services.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default About;