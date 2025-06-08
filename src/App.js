import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ProductsListing from "./components/ProductsListing";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="products" element={<ProductsListing />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
