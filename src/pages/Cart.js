import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [showUPI, setShowUPI] = useState(false);
  const [transactionId, setTransactionId] = useState("");
const [transactionSaved, setTransactionSaved] = useState(false);
const navigate = useNavigate();

const handleTransactionIdSubmit = async () => {
  if (!transactionId) {
    alert("Please enter the UPI Transaction ID.");
    return;
  }

  try {
    const response = await fetch("https://cask-server.onrender.com/api/save-transaction-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: formData.phone,
        transactionId,
      }),
    });

    if (response.ok) {
      setTransactionSaved(true);
      clearCart();
      navigate("/thank-you");
    } else {
      alert("Failed to save transaction ID.");
    }
  } catch (err) {
    console.error("Error saving transaction ID:", err);
    alert("Something went wrong.");
  }
};



  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const total = getTotalAmount();
  const upiLink = `upi://pay?pa=nitinsatya656@oksbi&pn=NitinSatya&am=${total}&cu=INR`;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.phone) {
    alert("Please fill in required fields.");
    return;
  }

  const payload = {
    ...formData,
    cartItems,
    total,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch("https://cask-server.onrender.com/api/save-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setShowUPI(true);
    } else {
      alert("Failed to save transaction.");
    }
  } catch (err) {
    console.error("Error sending data to backend:", err);
    alert("Something went wrong. Please try again.");
  }
};


  const handleUPIPayment = () => {
    window.location.href = upiLink;
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {!proceedToPayment ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    marginBottom: "15px",
                    paddingBottom: "10px",
                  }}
                >
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>₹{item.price * item.quantity}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: "red", marginLeft: "10px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <h3>Total: ₹{total}</h3>

              <button
                onClick={() => setProceedToPayment(true)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4285F4",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Proceed to Payment
              </button>
            </>
          ) : !showUPI ? (
            <>
              <h3>Total: ₹{total}</h3>
              <h4>Enter Your Details</h4>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{ display: "block", marginBottom: "10px", padding: "8px" }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  style={{ display: "block", marginBottom: "10px", padding: "8px" }}
                />
                <textarea
                  name="address"
                  placeholder="Delivery Address (Optional)"
                  value={formData.address}
                  onChange={handleFormChange}
                  rows={3}
                  style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#34A853",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Continue to Pay
                </button>
              </form>
            </>
          ) : (
            <>
              <h3>Total: ₹{total}</h3>

              <button
                onClick={handleUPIPayment}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#34A853",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  cursor: "pointer",
                  margin: "20px 0",
                }}
              >
                Pay with Google Pay / PhonePe
              </button>

              <div>
                <h4>Or Scan to Pay</h4>
                <QRCodeCanvas value={upiLink} size={180} />
                <p style={{ marginTop: "10px" }}>
                  UPI ID: <strong>nitinsatya656@oksbi</strong>
                </p>
              </div>

              {!transactionSaved ? (
  <div style={{ marginTop: "20px" }}>
    <h4>Enter Your UPI Transaction ID</h4>
    <input
      type="text"
      value={transactionId}
      onChange={(e) => setTransactionId(e.target.value)}
      placeholder="e.g., 1234567890UPI"
      style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
    />
    <button
      onClick={handleTransactionIdSubmit}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Submit Transaction ID
    </button>
  </div>
) : (
  <p style={{ color: "green", marginTop: "10px" }}>
    Transaction ID submitted successfully. Thank you!
  </p>
)}

            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
