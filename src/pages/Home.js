import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import logo from "../assets/bakery-logo.png";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://cask-server.onrender.com/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Bakery Logo" className="logo" />
        <div className="header-text">
          <h1>KNS Bakery</h1>
          <p>Freshly Baked Goodness Every Day 🍞🧁🥐</p>
        </div>
      </header>

      {/* Info Section */}
      <section className="bakery-info">
        <h2>🍰 About KNS Bakery</h2>
        <p>
          Welcome to KNS Bakery, where tradition meets taste. We pride ourselves on baking fresh, homemade bread, cakes, pastries, and more using high-quality ingredients and age-old recipes passed down through generations.
        </p>
        <p>
          Every bite you take is crafted with love and care by our passionate bakers. Whether it’s a birthday, wedding, or a simple sweet craving, we have something special for every occasion.
        </p>
      </section>

      {/* Product List */}
      <h2>🧁 Available Products</h2>
<div className="carousel-wrapper">
  <div className="carousel-track">
    {products.map(product => (
      <div key={product.id} className="product-card-3d">
        <img src={product.image_url} alt={product.name} />
        <h4>{product.name}</h4>
        <p>₹{product.price}</p>
        <p>{product.description}</p>
        
      </div>
    ))}
  </div>
</div>


      {/* Testimonials */}
      <section className="testimonials">
        <h2>💬 What Our Customers Say</h2>
        <div className="testimonial-card">
          <p>"Best cupcakes in town! So soft and delicious. I order every weekend!"</p>
          <h5>- Ayesha R.</h5>
        </div>
        <div className="testimonial-card">
          <p>"I ordered a custom cake for my daughter’s birthday — it was perfect!"</p>
          <h5>- Rahul M.</h5>
        </div>
        <div className="testimonial-card">
          <p>"Warm bread, friendly staff, and beautiful ambiance. Highly recommended."</p>
          <h5>- Sneha K.</h5>
        </div>
      </section>
    </div>
  );
};

export default Home;
