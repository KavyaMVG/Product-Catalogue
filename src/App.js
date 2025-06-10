import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ProductsListing from "./components/ProductsListing";
import ProductDetails from "./components/ProductDetails";
import { useState } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item, quantity) => {
    if (!item || !quantity) {
      return;
    }
    item.quantity = parseInt(quantity, 10);

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
      return;
    }
    item.quantity = parseInt(quantity, 10);
    setCart([...cart, item]);
  };

  const handleRemoveFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        const newQuantity = cartItem.quantity - 1;
        return { ...cartItem, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };
  const handleIncreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  return (
    <div className="App">
      <Router>
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductsListing />} />
          <Route
            path="products/:id"
            element={<ProductDetails handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="cart"
            element={
              <Cart
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
