import { Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { IoArrowBackCircle } from "react-icons/io5";

const Cart = ({
  cart,
  handleRemoveFromCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  const navigate = useNavigate();

  const getCartTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <>
      <div className="cartHeader">
        <IoArrowBackCircle className="backBtn" onClick={() => navigate(-1)} />

        <h2 className="title">Cart</h2>
      </div>
      <div className="cartWrapper">
        {cart.map((item) => (
          <Card key={item.id} className="cartContainer">
            <div className="cartImg">
              <img src={item.imageUrl} alt="product-img" />
            </div>
            <CardContent className="cartContent">
              <h3>{item.name}</h3>
              <p className="price">Price: ₹{item.price}</p>

              <div>
                <p className="qty">Quantity: {item.quantity}</p>
                <p>
                  Subtotal:
                  <strong>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </strong>{" "}
                </p>

                <div className="actionBtnWrapper">
                  <button
                    className="actionBtn"
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="actionBtn"
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <button
                className="removeBtn"
                onClick={() => handleRemoveFromCart(item)}
              >
                Remove from cart
              </button>
            </CardActions>
          </Card>
        ))}
        <div className="cartTotal" style={{ margin: "2rem" }}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <p>
              <label>Total Amount: </label>
              <strong>₹{getCartTotal(cart).toFixed(2)}</strong>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
