import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  return products.map((product) => {
    return (
      <div
        key={product.id}
        style={{ border: "1px solid black", width: "250px", margin: "1rem" }}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <p>{product.name}</p>
        <p>{product.price}</p>
        <img src={product.imageUrl} alt="product-img" />
      </div>
    );
  });
};

export default ProductCard;
