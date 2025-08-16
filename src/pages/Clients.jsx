import React from 'react';
import { motion } from 'framer-motion';
import client1 from '../assets/client1.jpg'
import client2 from '../assets/client2.jpg'
import client3 from '../assets/client3.jpg'

const Clients = () => {
  const clientCategories = [
    {
      id: 1,
      name: 'Enterprise',
      clients: [
        {  logo: 'https://images.seeklogo.com/logo-png/6/2/hindustan-aeronautics-limited-logo-png_seeklogo-66974.png' },
        { logo: 'https://www.citoinfotech.com/image/clients/enterprise/isro1.png' },
        { logo: 'https://www.citoinfotech.com/image/clients/enterprise/beml1.png' },
        { logo: client1 },


      ]
    },
    {
      id: 2,
      name: 'Government',
      clients: [
        { logo: client2 },
        { logo: 'https://download.logo.wine/logo/Indian_Air_Force/Indian_Air_Force-Logo.wine.png' },
        {  logo: 'https://dyncdn.exampathfinder.net/epf_n_attachments/organisation/Yg1KZu8V/logo.png' },
        {  logo: client3 },

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