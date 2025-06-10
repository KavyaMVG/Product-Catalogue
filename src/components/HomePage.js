import React from "react";
import modelImg from "../images/hnm.avif";
import "./homePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="heroContainer">
      <img src={modelImg} className="modelImg" alt="model" />
      <h3 className="shopNowBtn" onClick={() => navigate(`/products`)}>
        SHOP NOW
      </h3>
    </div>
  );
};

export default HomePage;
