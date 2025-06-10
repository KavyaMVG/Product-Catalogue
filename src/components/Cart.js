import React from "react";

const Cart = ({ cart }) => {
  let productFreq = {};

  cart.forEach((item) => {
    if (item.id in productFreq) {
      productFreq[item.id] = {
        ...item,
        quantity: productFreq[item.id].quantity + 1,
      };
    } else {
      productFreq[item.id] = { ...item, quantity: 1 };
    }
  });

  return Object.values(productFreq).map((item) => {
    return (
      <div key={item.id}>
        <p>Product: {item.name}</p>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  });
};

export default Cart;
