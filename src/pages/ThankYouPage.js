import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import thankYouSound from "../assets/thankyou.mp3"; // Make sure this file exists

import "./ThankYouPage.css";

const ThankYouPage = () => {
  const { width, height } = useWindowSize();
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    const audio = new Audio(thankYouSound);
    audio.play().catch(() => {
      console.warn("Autoplay blocked. Sound will play on interaction.");
    });
    setPlaySound(true);
  }, []);

  return (
    <div className="thankyou-container">
      {playSound && <Confetti width={width} height={height} />}
      <h1 className="thankyou-heading">🎉 Thank You for Your Order!</h1>
      <p className="thankyou-message">We appreciate your business and hope you enjoy your purchase.</p>
      <Link to="/" className="thankyou-button">Back to Home</Link>
    </div>
  );
};

export default ThankYouPage;
