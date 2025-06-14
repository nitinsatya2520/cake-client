import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; // ✅ Import your CartProvider
import ThankYouPage from "./pages/ThankYouPage";
import Contact from "./pages/Contact";
import Newnavbar from "./components/Newnavbar";

function App() {
  return (
    <CartProvider> {/* ✅ Wrap your entire app here */}
      <Router>
        <Navbar />
        <Newnavbar /> 
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
