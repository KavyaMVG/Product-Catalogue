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
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <div className="cardImage">
          <img src={product.imageUrl} alt="product-img" />
        </div>
        <CardContent className="cardContent">
          <p>{product.name}</p>
          <p>{product.price}</p>
        </CardContent>
      </Card>
    );
  });
};

export default ProductCard;
