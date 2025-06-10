import React from "react";

const Cart = ({
  cart,
  handleRemoveFromCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  const getCartTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div>
      <button onClick={() => window.history.back()}>Go Back</button>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{ border: "1px solid black", margin: "1rem" }}
        >
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <img
            src={item.imageUrl}
            alt="product-img"
            style={{ width: "100px" }}
          />
          <button onClick={() => handleDecreaseQuantity(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleIncreaseQuantity(item)}>+</button>
          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => handleRemoveFromCart(item)}>
            Remove from cart
          </button>
        </div>
      ))}
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <h3>Total: ${getCartTotal(cart).toFixed(2)}</h3>
      )}
    </div>
  );
};

export default Cart;
