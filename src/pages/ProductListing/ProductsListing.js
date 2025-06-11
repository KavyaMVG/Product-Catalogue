import { useEffect, useState } from "react";
import ProductCard from "./../../components/ProductCard/ProductCard";
import "./productsListing.css";
import { CircularProgress } from "@mui/material";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3005/products")
      .then((response) => response.json())
      .then((response) => {
        setInitialProducts(response);
        setLoading(false);
        setProducts(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setProducts(initialProducts);
    } else {
      const filteredProducts = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  const handleSort = (sortType) => {
    let sortedProducts = [...products];
    if (sortType === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  return (
    <>
      <div className="flexContainer">
        <div className="sortBy">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            name="sort"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="cardList">
        {loading ? (
          <div className="loadingContainer">
            <CircularProgress />
          </div>
        ) : (
          <ProductCard products={products} />
        )}
      </div>
    </>
  );
};

export default ProductsListing;
