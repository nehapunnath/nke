import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FiSearch } from 'react-icons/fi';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-[#f8f9fa] text-[#104016] shadow-md">
      <div className="container mx-auto px-1 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Nke Infinity Tech Logo"
            className="h-20 w-auto"
          />
          <h1 className="text-xl font-bold">NKE Infinity Tech Solutions</h1>
        </div>

        <div className="flex items-center justify-center flex-grow mx-8 max-w-2xl">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#104016]"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </form>
        </div>

        <nav className="flex-shrink-0">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-[#ffd2a8] transition-colors duration-300 font-medium whitespace-nowrap">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#ffd2a8] transition-colors duration-300 font-medium whitespace-nowrap">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-[#ffd2a8] transition-colors duration-300 font-medium whitespace-nowrap">
                Products
              </a>
            </li>
            <li>
              <a href="/clients" className="hover:text-[#ffd2a8] transition-colors duration-300 font-medium whitespace-nowrap">
                Clients
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#ffd2a8] transition-colors duration-300 font-medium whitespace-nowrap">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Search - Hidden on desktop */}
      <div className="md:hidden container mx-auto px-4 py-2">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#104016]"
          >
            <FiSearch className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;