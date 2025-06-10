import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./productsListing.css";
import { CircularProgress } from "@mui/material";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3005/products")
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setProducts(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="cardList">
      {loading ? (
        <div className="loadingContainer">
          <CircularProgress />
        </div>
      ) : (
        <ProductCard products={products} />
      )}
    </div>
  );
};

export default ProductsListing;
