import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3005/products/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setProductDetail(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);
  const handleAddToCart = (item) => {
    console.log({ item });
    setCart([...cart, item]);
  };

  return (
    <div className="cardWrapper">
      {loading ? (
        <CircularProgress />
      ) : (
        <Card className="cardDtlContainer">
          <div className="cardDtlImgContainer">
            <img src={productDetail?.imageUrl} alt="product-img" />
          </div>
          <CardContent className="cardDtlContent">
            <h3>{productDetail?.name}</h3>
            <p>Rs.{productDetail?.price}</p>
            <p>{productDetail?.description}</p>
          </CardContent>
          <CardActions>
            <button onClick={() => handleAddToCart(productDetail)}>
              Add to cart
            </button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default ProductDetails;
