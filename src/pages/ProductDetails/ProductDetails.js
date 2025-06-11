import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ cart, handleAddToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://json-server-vercel-sigma-rust.vercel.app/products/${id}`)
      .then((response) => {
        if (response.status === 404) {
          setLoading(false);
          throw new Error("Product not found");
        }
        if (!response.ok) {
          setLoading(false);
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((response) => {
        setLoading(false);
        setProductDetail(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [id]);

  const isItemInCart = (item) => {
    if (!item || !cart || cart.length === 0) {
      return false;
    }
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <div>
      <IoArrowBackCircle className="backBtn" onClick={() => navigate(-1)} />
      <div className="cardWrapper">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div className="error">
            <h2>{error}</h2>
            <button onClick={() => navigate("/products")}>
              Go to Products
            </button>
          </div>
        ) : (
          <Card className="container">
            <div className="imgContainer">
              <img src={productDetail?.imageUrl} alt="product-img" />
            </div>
            <CardContent className="content">
              <h3>{productDetail?.name}</h3>
              <p> ₹{productDetail?.price}</p>
              <p>{productDetail?.description}</p>
            </CardContent>
            <CardActions>
              <button
                className="addToCartBtn"
                onClick={() => handleAddToCart(productDetail)}
                style={{
                  backgroundColor: isItemInCart(productDetail)
                    ? "#4CAF50"
                    : null,
                }}
              >
                {isItemInCart(productDetail) ? `Added` : "Add"} to cart
              </button>
            </CardActions>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
