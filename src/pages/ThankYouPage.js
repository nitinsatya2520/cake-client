// src/pages/ThankYouPage.js
import React from "react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Thank You for Your Order!</h1>
      <p style={styles.message}>We appreciate your business and hope you enjoy your purchase.</p>
      <Link to="/" style={styles.button}>Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    padding: "20px",
  },
  heading: {
    fontSize: "32px",
    color: "#4CAF50",
  },
  message: {
    fontSize: "18px",
    margin: "20px 0",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
  }
};

export default ThankYouPage;
