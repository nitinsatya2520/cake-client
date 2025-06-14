import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);
  fetch("https://cask-server.onrender.com/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setFiltered(data);
    })
    .catch((err) => console.error("Error fetching products:", err))
    .finally(() => setLoading(false));
}, []);


  useEffect(() => {
    let temp = [...products];

    // Search Filter
    if (search.trim()) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "price-asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      temp.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFiltered(temp);
  }, [search, sortOption, products]);

  if (loading) {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading products...</p>
    </div>
  );
}
  return (
    <div className="products-container">
      <h2 className="products-title">🧁 Our Products</h2>

      {/* 🔍 Search + Sort */}
      <div className="search-sort-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found.</p>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="product-price">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="product-button"
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
