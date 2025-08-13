import React, { useState, useEffect } from 'react';
import '../styles/HomeGallery.css'; 

const HomeGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    { 
      name: 'Dell Precision Workstation', 
      image: 'https://pcsalesservice.com/wp-content/uploads/2022/04/pc-and-mac-computers.png' 
    },
    { 
      name: 'HP EliteBook Laptop', 
      image: 'https://in-media.apjonlinecdn.com/catalog/product/B/8/B85PZPT-8_T1736239218.png' 
    },
    { 
      name: 'Epson Projector', 
      image: 'https://mediaserver.goepson.com/ImConvServlet/imconv/9f0efaed0faff3d37f054faeaa62dbe3637b0de3/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=E01_b_No.5' 
    },
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [products.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {products.map((product, index) => (
              <div className="carousel-card" key={index} data-name={product.name}>
                <img src={product.image} alt={product.name} />
                <div
                  className={`carousel-name ${currentSlide === index ? 'animate-slideUpFadeIn' : ''}`}
                >
                  {product.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;