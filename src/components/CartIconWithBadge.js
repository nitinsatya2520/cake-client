// components/CartIconWithBadge.js
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CartIconWithBadge() {
  const { getCartCount } = useCart();
  const count = getCartCount?.() || 0;

  return (
    <div className="cart-badge-wrapper">
      <FaShoppingCart className="icon" />
      {count > 0 && <span className="cart-badge">{count}</span>}
    </div>
  );
}

export default CartIconWithBadge;
