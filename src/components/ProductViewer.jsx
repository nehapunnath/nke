import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ProductViewer() {
  const nav = useNavigate();
  const products = [
    { 
      name: 'Computers', 
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Crystal_Project_computer.png/250px-Crystal_Project_computer.png", 
      description: "High-performance computers for all your needs." 
    },
    { 
      name: 'Laptops', 
      image: 'https://png.pngtree.com/png-vector/20250522/ourmid/pngtree-modern-laptop-computer-with-screen-open-technology-digital-device-png-image_16345445.png', 
      description: "Portable and powerful laptops for work and play." 
    },
    { 
      name: 'Printers', 
      image: 'https://pngimg.com/d/printer_PNG101578.png', 
      description: "High-quality printers for home and office use." 
    },
   
    { 
      name: 'Projectors', 
      image: 'https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-office-work-projector-illustration-3d-png-image_11506730.png', 
      description: "Crystal clear projection for presentations and entertainment." 
    },
    { 
      name: 'Interactive Touch Panels', 
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*s85Wbcp7558iYploN3CESg.png', 
      description: "Interactive displays for collaborative environments." 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const getVisibleProducts = () => {
    const prev = (currentIndex - 1 + products.length) % products.length;
    const next = (currentIndex + 1) % products.length;
    return [products[prev], products[currentIndex], products[next]];
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className="relative max-w-6xl mx-auto my-8 px-4 flex items-center justify-center">
      <button 
        className="absolute left-0 bg-[#f5f5f5] text-white rounded-full p-2 z-10 hover:bg-[#425333] transition-colors"
        onClick={handlePrev}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="w-full overflow-visible">
        <div className="flex justify-around items-center">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 cursor-pointer flex-1 max-w-[33%] min-h-[450px]"
              initial={{ opacity: 0 }}
              animate={{
                scale: index === 1 ? 1.2 : 0.9,
                opacity: 1,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded-lg"
                initial={{ opacity: 0 }}
                animate={{
                  scale: index === 1 ? 1.1 : 0.95,
                  opacity: 1,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <motion.p
                className="mt-4 text-[#104016] text-center font-medium"
                animate={{
                  scale: index === 1 ? 1.2 : 1,
                  fontSize: index === 1 ? "1.5rem" : "1rem",
                  opacity: index === 1 ? 1 : 0.7,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {product.name}
              </motion.p>
              <motion.p
                className="mt-2 text-gray-600 text-sm text-center"
                animate={{
                  opacity: index === 1 ? 1 : 0.6,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {product.description}
              </motion.p>
              <motion.button
                className="mt-8 bg-[#104016] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#425333] transition-colors"
                animate={{
                  opacity: index === 1 ? 1 : 0.3,
                  scale: index === 1 ? 1 : 0.9,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={() => nav('/products-details')}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <button 
        className="absolute right-0 bg-[#104016] text-white rounded-full p-2 z-10 hover:bg-[#425333] transition-colors"
        onClick={handleNext}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default ProductViewer;