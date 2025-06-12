import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ import useCart

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ get addToCart function from context

  useEffect(() => {
    fetch("https://cask-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Our Products</h2>
      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px" }}>{product.name}</h3>
                <p style={{ fontSize: "14px", color: "#666" }}>{product.description}</p>
                <p style={{ fontWeight: "bold", margin: "10px 0" }}>₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)} // ✅ call addToCart here
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#6200ea",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
