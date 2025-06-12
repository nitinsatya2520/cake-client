import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate();

  // Sync isLoggedIn state with localStorage changes
  useEffect(() => {
    const syncLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", syncLoginStatus);
    return () => window.removeEventListener("storage", syncLoginStatus);
  }, []);

  // Optional: force check on every render
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [localStorage.getItem("isLoggedIn")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🍰 Cask Bakery</div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </div>

      <div style={styles.authSection}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.authButton}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200ea",
    padding: "10px 20px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    padding: "6px 8px",
  },
  authSection: {
    display: "flex",
    gap: "10px",
  },
  authButton: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
