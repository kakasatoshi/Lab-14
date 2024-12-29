import React, { useState, useEffect } from "react";
import "../../css/product.css";
import useHttp from "../../http/useHttp";
import { useNavigate } from "react-router-dom";
import Product from "./Product";

const ProductList = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttp();
  const [products, setProducts] = useState([]);
  const applyData = (data) => {
    // Xử lý dữ liệu từ API
    setProducts(data.products);
    // console.log(data); // Hoặc cập nhật state hoặc render dữ liệu vào giao diện
  };

  useEffect(() => {
    const requestConfig = {
      url: "http://localhost:5000/shop/products", // Địa chỉ API của bạn
    };

    sendRequest(requestConfig, applyData);
  }, []); // Gọi lại sendRequest khi component mount

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const deleteProductHandler = async (productId) => {
    const url = "http://localhost:5000/admin/delete-product";
    const payload = {
      productId: productId,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) navigate("/admin/ProductList"); // Redirect to product list
    } catch (error) {
      console.error("Error submitting form", error);
    }
    navigate("/shop/products");
    // window.location.reload();
  };

  const editProductHandler = (product) => {
    navigate(`/admin/EditProduct/${product.id}`, {
      state: { editing: true, product: product },
    });
  };

  return (
    <div>
      <main>
        {products.length > 0 ? (
          <div className="grid">
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <h1>No Products Found!</h1>
        )}
      </main>
    </div>
  );
};

export default ProductList;
