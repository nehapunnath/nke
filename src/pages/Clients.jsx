import React from 'react';
import { motion } from 'framer-motion';

const Clients = () => {
  const clientCategories = [
    {
      id: 1,
      name: 'Enterprise',
      clients: [
        {  logo: 'https://www.citoinfotech.com/image/clients/enterprise/iti.png' },
        { logo: 'https://www.citoinfotech.com/image/clients/enterprise/isro1.png' },
        { logo: 'https://www.citoinfotech.com/image/clients/enterprise/beml1.png' }
      ]
    },
    {
      id: 2,
      name: 'Government',
      clients: [
        { logo: 'https://www.citoinfotech.com/image/clients/goverment/army1.png' },
        { logo: 'https://www.citoinfotech.com/image/clients/goverment/airforce1.png' },
        {  logo: 'https://www.citoinfotech.com/image/clients/goverment/post1.png' }
      ]
    },

  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#104016] to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
            Our Clients
          </h1>
          <p className="text-xl text-[#425333] max-w-2xl mx-auto">
            Trusted by India's leading organizations
          </p>
        </div>
      </div>

      {/* Client Logos Grid */}
      <div className="container mx-auto px-4 py-16">
        {clientCategories.map((category) => (
          <div key={category.id} className="mb-20">
            <h2 className="text-2xl font-bold text-[#104016] mb-8 text-center border-b-2 border-[#104016] pb-2 inline-block">
              {category.name}
            </h2>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {category.clients.map((client) => (
                <motion.div
                  key={client.name}
                  className=" p-6 rounded-lg flex items-center justify-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-21 object-contain  transition-all"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Clients;