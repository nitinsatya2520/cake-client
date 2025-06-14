import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";
import "./Newnavbar.css";
import CartIconWithBadge from "./CartIconWithBadge"; // adjust path as needed

function Newnavbar() {
  const location = useLocation();
  const [showFab, setShowFab] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFabClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="newnavbar slide-in">
        <div className="newnavbar-links">
          <Link to="/" className={`newnavbar-link ${location.pathname === "/" ? "active" : ""}`}>
            <FaHome className="icon" />
            <span className="label">Home</span>
          </Link>
          <Link to="/products" className={`newnavbar-link ${location.pathname === "/products" ? "active" : ""}`}>
            <FaShoppingBag className="icon" />
            <span className="label">Shop</span>
          </Link>
         <Link
  to="/cart"
  className={`newnavbar-link ${location.pathname === "/cart" ? "active" : ""}`}
>
  <CartIconWithBadge />
  <span className="label">Cart</span>
</Link>

          <Link to="/contact" className={`newnavbar-link ${location.pathname === "/contact" ? "active" : ""}`}>
            <FaEnvelope className="icon" />
            <span className="label">Contact</span>
          </Link>
        </div>
      </nav>

      {/* FAB: visible only when showFab is true */}
      <button
        className={`fab ${showFab ? "fab-visible" : "fab-hidden"}`}
        onClick={handleFabClick}
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </button>
    </>
  );
}

export default Newnavbar;
