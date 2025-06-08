import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();

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
      <button>Add to cart</button>
    </div>
  );
};

export default ProductDetails;
