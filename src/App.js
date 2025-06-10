import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ProductsListing from "./components/ProductsListing";
import ProductDetails from "./components/ProductDetails";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleAddToCart = (item) => {
    if (!item) {
      return;
    }
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return;
    }
    item.quantity = 1;
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  };

  const handleRemoveFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="App">
      <Router>
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductsListing />} />
          <Route
            path="product/:id"
            element={
              <ProductDetails cart={cart} handleAddToCart={handleAddToCart} />
            }
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
