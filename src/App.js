import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ProductsListing from "./pages/ProductListing/ProductsListing";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import useCart from "./hooks/useCart";

function App() {
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useCart();

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
