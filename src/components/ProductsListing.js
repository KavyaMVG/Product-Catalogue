import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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
    <div>
      {loading ? "Loadiiiinnnngggg" : <ProductCard products={products} />}
    </div>
  );
};

export default ProductsListing;
