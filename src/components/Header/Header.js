import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./header.css";

const Header = ({ cart }) => {
  const navigate = useNavigate();

  return (
    <main>
      <header className="header">
        <span className="item-count">{cart?.length}</span>
        <FaShoppingCart className="cart" onClick={() => navigate("/cart")} />
      </header>
    </main>
  );
};

export default Header;
