import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ handleAddToCart }) => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3005/products/${id}`)
      .then((response) => response.json())
      .then((response) => setProductDetail(response))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div style={{ border: "1px solid black", width: "250px", margin: "1rem" }}>
      <p>{productDetail?.name}</p>
      <p>{productDetail?.price}</p>
      <img src={productDetail?.imageUrl} alt="product-img" />
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        <option value="">Select quantity</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p>{productDetail?.description}</p>
      <button onClick={() => handleAddToCart(productDetail, quantity)}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductDetails;
