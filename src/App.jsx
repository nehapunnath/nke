import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Clients from "./pages/Clients";

// Admin Pages
import Auth from "./pages/Admin/Auth";
import AdminDash from "./pages/Admin/AdminDash";
import AddProducts from "./pages/Admin/AddProducts";
import AdminProducts from "./pages/Admin/AdminProducts";
import ViewProducts from "./pages/Admin/ViewProducts";
import EditProducts from "./pages/Admin/EditProducts";
import Enquiry from "./pages/Admin/Enquiry";
import AdminContacts from "./pages/Admin/AdminContacts";
import AdminGallery from "./pages/Admin/AdminGallery";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  // Hide header and footer on admin routes
  const hideHeaderFooter =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <>
      {/* Show header only on user routes */}
      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products-details/:id" element={<ProductDetails />} />
        <Route path="/clients" element={<Clients />} />

        {/* Admin Routes */}
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/admin/dash" element={<AdminDash />} /> */}
        <Route path="/admin/products/new" element={<AddProducts />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/view" element={<ViewProducts />} />
        <Route path="/admin/products/edit/:id" element={<EditProducts />} />
        <Route path="/admin/enquiries" element={<Enquiry />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
      </Routes>

      {/* Show footer only on user routes */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
