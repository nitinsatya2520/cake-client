import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const syncLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", syncLoginStatus);
    return () => window.removeEventListener("storage", syncLoginStatus);
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [localStorage.getItem("isLoggedIn")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMenuOpen(false); // Close menu on logout
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/logo.png" alt="KNS Bakery" className="navbar-logo" />
        <span className="navbar-title">KNS Bakery</span>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" className="navbar-link" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/cart" className="navbar-link" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/contact" className="navbar-link" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>

      <div className={`navbar-auth ${menuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="navbar-link" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
