import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Products = () => {
  const productCategories = [
    {
      id: 1,
      name: 'Computers',
      catalogue: '',
      items: [
        { 
          id: 101, 
          name: 'Dell Precision Workstation', 
          image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/workstations/mobile-workstations/precision/16-7680/media-gallery/notebook-precision-7680-gray-gallery-10.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=565&qlt=100,1&resMode=sharp2&size=565,402&chrss=full', 
          price: '₹85,000', 
          specs: 'Intel Xeon, 32GB RAM, 1TB SSD, NVIDIA RTX A4000',
        },
        { 
          id: 102, 
          name: 'HP All-in-One PC', 
          image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07962448.png', 
          price: '₹65,000', 
          specs: '27" FHD Touch, Intel i7, 16GB RAM, 512GB SSD',
        },
        { 
          id: 103, 
          name: 'ASUS Gaming Desktop', 
          image: 'https://png.pngtree.com/png-clipart/20241124/original/pngtree-asus-desktop-computers-png-image_17288129.png', 
          price: '₹1,25,000', 
          specs: 'AMD Ryzen 9, 32GB RAM, 1TB NVMe SSD, RTX 3080',
          // productSpecs: '/catalogues/product-specs/asus-gaming-desktop-specs.pdf'
        }
      ]
    },
    {
      id: 2,
      name: 'Laptops',
      catalogue: '',
      items: [
        { 
          id: 201, 
          name: 'Lenovo ThinkPad X1 Carbon', 
          image: 'https://p3-ofp.static.pub//fes/cms/2024/07/05/05dhzg0lrtq4i0d3wxqyjjakwmbmzr331426.png', 
          price: '₹1,45,000', 
          specs: '14" 4K, Intel i7, 16GB RAM, 1TB SSD',
        },
        { 
          id: 202, 
          name: 'MacBook Pro 14"', 
          image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788574000', 
          price: '₹1,99,900', 
          specs: 'M1 Pro chip, 16GB RAM, 512GB SSD',
        },
        { 
          id: 203, 
          name: 'ASUS ROG Zephyrus G14', 
          image: 'https://dlcdnwebimgs.asus.com/gain/DBB47F70-325D-4510-9E3E-0548FEF67FB1', 
          price: '₹1,55,000', 
          specs: '14" QHD 120Hz, Ryzen 9, 32GB RAM, RTX 3060',
        }
      ]
    },
    {
      id: 3,
      name: 'Printers',
      catalogue: '',
      items: [
        { 
          id: 301, 
          name: 'HP LaserJet Pro M404dn', 
          image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05317438.png', 
          price: '₹25,000', 
          specs: 'Monochrome, 40ppm, Duplex, Ethernet',
        },
        { 
          id: 302, 
          name: 'Epson EcoTank L3150', 
          image: 'https://csmarket.in/wp-content/uploads/2021/05/L3150-EP.png', 
          price: '₹18,500', 
          specs: 'Color Inkjet, Scanner, Copier, WiFi',
        },
        { 
          id: 303, 
          name: 'Canon imageCLASS MF644Cdw', 
          image: 'https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/410231-all-in-one-color-laser-printers-canon-color-imageclass-mf753cdw-10036790.png', 
          price: '₹38,000', 
          specs: 'Color Laser, A4, Print/Scan/Copy/Fax',
        }
      ]
    },
    {
      id: 4,
      name: 'Projectors',
      catalogue: '',
      items: [
        { 
          id: 401, 
          name: 'Epson EB-E01', 
          image: 'https://mediaserver.goepson.com/ImConvServlet/imconv/9f0efaed0faff3d37f054faeaa62dbe3637b0de3/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=E01_b_No.5', 
          price: '₹55,000', 
          specs: '3LCD, 3600 Lumens, 1080p, HDMI',
        },
        { 
          id: 402, 
          name: 'BenQ GV30', 
          image: 'https://egyptlaptop.com/images/detailed/75/Benq_GV30_Projector__1_.webp', 
          price: '₹65,000', 
          specs: 'Portable, 1080p, Android TV, Bluetooth',
        },
        { 
          id: 403, 
          name: 'ViewSonic M1+', 
          image: 'https://www.viewsonic.com/vsAssetFile/za/img/resize/product-rc/projector/M1/07_Cinema-on-the-Go.webp', 
          price: '₹42,000', 
          specs: 'LED, 1080p, 600 Lumens, Harman Kardon',
        }
      ]
    },
    {
      id: 5,
      name: 'Interactive Panels',
      catalogue: '',
      items: [
        { 
          id: 501, 
          name: 'ViewSonic IFP6550', 
          image: 'https://images.jdmagicbox.com/quickquotes/images_main/viewsonic-ifp6550-65inches-viewboard-2217798209-ryjxq4gf.png', 
          price: '₹1,85,000', 
          specs: '65" 4K UHD, Android, 20-point touch',
        },
        { 
          id: 502, 
          name: 'BenQ RM6503K', 
          image: 'https://image.benq.com/is/image/benqco/65-front?$ResponsivePreset$&fmt=png-alpha', 
          price: '₹2,25,000', 
          specs: '65" 4K, Windows 10, OPS slot',
        },
        { 
          id: 503, 
          name: 'Newline TT-6519S', 
          image: 'https://5.imimg.com/data5/SELLER/Default/2021/10/JD/JN/HN/122432607/tt-6519rs-newline-interactive-display.png', 
          price: '₹1,95,000', 
          specs: '65" 4K, Android 9.0, 32GB storage',
        }
      ]
    },
    {
      id: 6,
      name: 'Scanners',
      catalogue: '',
      items: [
        { 
          id: 601, 
          name: 'Fujitsu ScanSnap iX1600', 
          image: 'https://www.forefrontec.com/wp-content/uploads/2021/12/PA03820-B001__ScanSnap_iX1400_W__ProductFrontRight_FoldedA3_Carriersheet_Scan_TransBG__1000x1000__060423__00.png', 
          price: '₹45,000', 
          specs: 'Color Duplex, 40ppm, WiFi, USB 3.0',
        },
        { 
          id: 602, 
          name: 'Epson WorkForce DS-530', 
          image: 'https://mediaserver.goepson.com/ImConvServlet/imconv/f1ca0b7427f6a38ee9e7b2221758f861f8c29df2/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=Sus2-SA_WH_03%20paper_Ref', 
          price: '₹32,000', 
          specs: 'ADF, 35ppm, Duplex, USB 2.0',
        },
        { 
          id: 603, 
          name: 'Canon imageFORMULA DR-C225', 
          image: 'https://in.canon/media/image/2018/09/06/f829c6d375cb463e8ff9722746a4475a_DR-C225-II--225W-II-image.png', 
          price: '₹38,500', 
          specs: 'Color, 25ppm, Wireless, USB 3.0',
        }
      ]
    },
    {
      id: 7,
      name: 'CCTV Systems',
      catalogue: '',
      items: [
        { 
          id: 701, 
          name: 'Hikvision DS-2CD2043G0-I', 
          image: 'https://www.hikvisionindia.com/storage/app/uploads/public/603/8cc/5be/6038cc5bef457197437179.png', 
          price: '₹8,500', 
          specs: '4MP, IR Night Vision, IP67, 2.8mm lens',
        },
        { 
          id: 702, 
          name: 'Dahua IPC-HDW3849H-AS-PV', 
          image: 'https://material.dahuasecurity.com/uploads/image/20200818/IPC-HDW3849H-AS-PV_thumb.png', 
          price: '₹12,000', 
          specs: '8MP, Starlight, AI Detection, IP67',
        },
        { 
          id: 703, 
          name: 'CP Plus 3MP Bullet Camera', 
          image: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Home%20Safety%20Security/Images/302137_d7jlqq.png?tr=w-600', 
          price: '₹7,200', 
          specs: '3MP, Weatherproof, Night Vision, 4mm lens',
        }
      ]
    },
    // Add this to your productCategories array (around line 12)
{
  id: 8,
  name: 'UPS Systems',
  catalogue: '',
  items: [
    { 
      id: 801, 
      name: 'APC Back-UPS BX1100C-IN', 
      image: 'https://www.namratapower.com/img/APC-Back-UPS-1100VA-back.png', 
      price: '₹12,500', 
      specs: '1100VA/660W, 6 Outlets, AVR, USB Charging',
    },
    { 
      id: 802, 
      name: 'Microtek Legend 1600', 
      image: 'https://tiimg.tistatic.com/fp/1/008/410/rectangular-plain-over-current-protection-single-phase-plastic-body-ups--158.jpg', 
      price: '₹15,000', 
      specs: '1600VA/960W, Pure Sine Wave, LCD Display',
    },
    { 
      id: 803, 
      name: 'Zebronics UPS 1000VA', 
      image: 'https://5.imimg.com/data5/SELLER/Default/2025/2/491265674/TI/GI/KB/38599557/zebronics-1000va-line-interactive-ups.png', 
      price: '₹8,500', 
      specs: '1000VA/600W, 2 Battery Backup Ports',
    },
   
    
   
  ]
}
  ];

  const [activeCategory, setActiveCategory] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredCategories = productCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-[#104016] to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#222222] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Products
            </motion.h1>
            <motion.p 
              className="text-xl text-[#104016] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              High-quality IT hardware solutions for all your needs
            </motion.p>
          </div>
        </section>

        <section className="py-8 bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                <div className="flex space-x-2">
                  {productCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${
                        activeCategory === category.id
                          ? 'bg-[#104016] text-white'
                          : 'bg-gray-100 text-[#425333] hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl text-[#104016] mb-4">No products found</h3>
                <p className="text-gray-700">Try adjusting your search or filter</p>
              </div>
            ) : (
              filteredCategories
                .filter(category => activeCategory === 0 || category.id === activeCategory)
                .map((category) => (
                  <motion.div 
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                      <h2 className="text-3xl font-bold text-[#104016]">{category.name}</h2>
                      <div className="flex gap-4">
                        <a 
                          href={category.catalogue} 
                          
                          className="flex items-center gap-2 bg-white border border-[#104016] text-[#104016] px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download Full Catalogue
                        </a>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.items.map((product) => (
                        <motion.div
                          key={product.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
                          whileHover={{ y: -5 }}
                        >
                          <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
                              }}
                            />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-[#104016] mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{product.specs}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-[#425333]">{product.price}</span>
                              <div className="flex gap-2">
                                <Link 
                                  to={`/products-details`}
                                  className="bg-[#104016] text-white px-4 py-2 rounded-md hover:bg-[#425333] transition-colors text-center"
                                >
                                  View Details
                                </Link>
                                
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;