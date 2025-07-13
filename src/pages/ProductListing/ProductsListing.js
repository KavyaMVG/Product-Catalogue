import { useEffect, useState } from "react";
import ProductCard from "./../../components/ProductCard/ProductCard";
import "./productsListing.css";
import { CircularProgress } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://json-server-vercel-sigma-rust.vercel.app/products")
      .then((response) => {
        if (response.status === 404) {
          setLoading(false);
          throw new Error("Products not found");
        }
        if (!response.ok) {
          setLoading(false);
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((response) => {
        setInitialProducts(response);
        setLoading(false);
        setProducts(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  const handleSearch = () => {
    if (query.trim() === "") {
      setProducts(initialProducts);
    } else {
      const filteredProducts = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
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
            placeholder="Search...."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="cardList">
        {loading ? (
          <div className="loadingContainer">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="error">
            <h2>{error}</h2>
          </div>
        ) : (
          <ProductCard products={products} />
        )}
      </div>
    </>
  );
};

export default ProductsListing;
