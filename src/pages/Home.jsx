import React from 'react';
import ProductViewer from '../components/ProductViewer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const statItemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-[#104016] to-[#2c7744] py-28 text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffd2a8] to-white">
              Nke Infinity Tech Solutions
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            We deal in sales of Computers, laptops, printers, Multi function machines, Projectors, interactive touch panels
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Products Available" },
              { value: "10+", label: "Brand Partnerships" },
              { value: "1000+", label: "Satisfied Clients" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-[#f8f8f8] rounded-lg shadow-sm hover:shadow-md transition-shadow"
                variants={statItemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl font-bold text-[#104016] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Product Gallery */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#104016] mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium IT equipment and solutions
            </p>
          </motion.div>
          
          <ProductViewer/>
          
          <motion.div className="text-center mt-10" variants={itemVariants}>
            <Link 
              to="/products" 
              className="inline-flex items-center text-[#104016] hover:text-[#2c7744] font-medium text-lg group transition-colors duration-300"
            >
              View All Products
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-[#f0f7f4] to-[#c4e3d5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-[#104016] mb-12"
            variants={itemVariants}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                rating: "★★★★★",
                quote: "Nke Infinity provided our school with high-quality interactive panels that have transformed our classrooms. Their after-sales support is exceptional.",
                name: "Rahul Sharma"
              },
              {
                rating: "★★★★★",
                quote: "We've been sourcing our office computers from Nke Infinity for 3 years now. Reliable products and on-time delivery every time.",
                name: "Priya Patel"
              },
              {
                rating: "★★★★☆",
                quote: "Great service and competitive pricing. They helped us set up our entire office IT infrastructure within our budget.",
                name: "Arjun Mehta"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">{testimonial.rating}</div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="font-medium">{testimonial.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;