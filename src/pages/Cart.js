import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import './Cart.css';

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
    <div className="cart-container">
  <h2>Your Cart</h2>

  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      {!proceedToPayment ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">₹{item.price * item.quantity}</p>
              <div className="cart-item-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="total-price">Total: ₹{total}</h3>

          <button
            onClick={() => setProceedToPayment(true)}
            className="proceed-btn"
          >
            Proceed to Payment
          </button>
        </>
      ) : !showUPI ? (
        <>
          <h3 className="total-price">Total: ₹{total}</h3>
          <h4>Enter Your Details</h4>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="form-input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleFormChange}
              required
              className="form-input"
            />
            <textarea
              name="address"
              placeholder="Delivery Address (Optional)"
              value={formData.address}
              onChange={handleFormChange}
              rows={3}
              className="form-textarea"
            />
            <button type="submit" className="continue-btn">
              Continue to Pay
            </button>
          </form>
        </>
      ) : (
        <>
          <h3 className="total-price">Total: ₹{total}</h3>

          <button
            onClick={handleUPIPayment}
            className="pay-btn"
          >
            Pay with Google Pay / PhonePe
          </button>

          <div className="qr-section">
            <h4>Or Scan to Pay</h4>
            <QRCodeCanvas value={upiLink} size={180} />
            <p>
              UPI ID: <strong>nitinsatya656@oksbi</strong>
            </p>
          </div>

          {!transactionSaved ? (
            <div className="txn-form">
              <h4>Enter Your UPI Transaction ID</h4>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., 1234567890UPI"
                className="form-input"
              />
              <button
                onClick={handleTransactionIdSubmit}
                className="submit-txn-btn"
              >
                Submit Transaction ID
              </button>
            </div>
          ) : (
            <p className="success-msg">
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
