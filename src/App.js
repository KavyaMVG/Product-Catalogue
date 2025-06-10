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
  return (
    <div className="App">
      <Router>
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductsListing />} />
          <Route
            path="products/:id"
            element={<ProductDetails cart={cart} setCart={setCart} />}
          />
          <Route path="cart" element={<Cart cart={cart} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
