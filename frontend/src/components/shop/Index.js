import React, { useState, useEffect } from "react";
import AddToCart from "../includes/AddToCart"; // Separate AddToCart component
import "../../css/product.css";
import "../../css/cart.css";
import useHttp from "../../http/useHttp";
const Index = () => {
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

  return (
    <div>
      <main>
        {products.length > 0 ? (
          <div className="grid">
            {products.map((product) => (
              <article className="card product-item" key={product._id}>
                <header className="card__header">
                  <h1 className="product__title">{product.title}</h1>
                </header>
                <div className="card__image">
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="card__content">
                  <h2 className="product__price">${product.price}</h2>
                  <p className="product__description">{product.description}</p>
                </div>
                <div className="card__actions">
                  <AddToCart id={product._id} />
                  {console.log(product, "product")}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <h1>No Products Found!</h1>
        )}
      </main>
    </div>
  );
};

export default Index;
