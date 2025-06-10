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

  console.log({ productFreq });

  return productFreq.map((item) => {
    return (
      <div key={item.id}>
        <p>{item.price}</p>
        <p>{item.name}</p>
        <p>{item.id}</p>
      </div>
    );
  });
};

export default Cart;
