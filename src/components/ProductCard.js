import { Card, CardContent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  return products.map((product) => {
    return (
      <Card
        className="cardContainer"
        key={product.id}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="cardImgContainer">
          <img src={product.imageUrl || "/placeholder.svg"} alt="product-img" />
        </div>
        <CardContent className="cardContent">
          <h3>{product.name}</h3>
          <p> ₹{product.price}</p>
        </CardContent>
      </Card>
    );
  });
};

export default ProductCard;
