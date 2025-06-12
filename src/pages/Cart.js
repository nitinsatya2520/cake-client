import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, clearCart } = useCart();

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = async () => {
    const total = getTotalAmount();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // replace with your Razorpay key
      amount: total * 100, // amount in paise
      currency: "INR",
      name: "Cask Bakery",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment successful!");
        clearCart();
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#6200ea",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name} x {item.quantity}</p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}
          <h3>Total: ₹{getTotalAmount()}</h3>
          <button onClick={handlePayment} style={{ padding: "10px 20px", backgroundColor: "#6200ea", color: "white", border: "none", borderRadius: "5px" }}>
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;




const styles = {
  // ... existing styles
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px"
  },
  qtyBtn: {
    padding: "4px 12px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  qty: {
    fontWeight: "bold",
    fontSize: "16px"
  },
  removeBtn: {
    marginTop: "10px",
    backgroundColor: "#ff5252",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
