import React, { useState } from "react";
import useHttp from "../../http/useHttp";
import '../../css/addtocart.css';


const AddToCart = ({ id }) => {
  // console.log("Product ID:", id);
  const [productId, setProductId] = useState(id);
  // console.log("Add to Cart:", productId);
  const { isLoading: loading, error: err, sendRequest } = useHttp();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:5000/shop/postCart";

    const payload = {
      productId: productId,
    };

    const requestConfig = {
      url,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    };

    try {
      await sendRequest(requestConfig);
      console.log("Product added to cart successfully");
      return;
    } catch (error) {
      console.error("Error submitting form", error);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <button className="btn-addtocart btn" type="submit">
        Add to Cart
      </button>
      {/* <input type="hidden" name="productId" value={id} /> */}
    </form>
  );
};

export default AddToCart;
