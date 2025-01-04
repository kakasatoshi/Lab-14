import React, { useState, useEffect } from "react";
import useHttp from "../../http/useHttp";
import useCarts from "../../http/useCart";
import { useNavigate } from "react-router-dom";
import "../../css/cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttp();
  const [carts, setCarts] = useState([]);
  const [show, setShow] = useState(false);

  const applyData = (data) => {
    console.log(data);
    setCarts(data.products);
    // console.log(data); // Hoặc cập nhật state hoặc render dữ liệu vào giao diện
  };

  useEffect(() => {
    const requestConfig = {
      url: "http://localhost:5000/shop/cart", // Địa chỉ API của bạn
    };

    sendRequest(requestConfig, applyData);
  }, []); // Gọi lại sendRequest khi component mount

  // const cart = Carts.cart || [];

  const deleteItemHandler = (productId) => {
    console.log(productId);
    const requestConfig = {
      url: "http://localhost:5000/shop/cartDeleteItem",
      method: "POST", // Hoặc "DELETE" nếu backend hỗ trợ
      headers: { "Content-Type": "application/json" },
      body: { productId: productId }, // Truyền productId đúng format
    };

    sendRequest(requestConfig, (responseData) => {
      // Sau khi xóa thành công, cập nhật lại giỏ hàng hoặc xử lý tương tự
      console.log("", responseData);
      setShow(!show);
      navigate("/shop/cart");
    });

    window.location.reload();
  };
  const onOrderNow = () => {
    const requestConfig = {
      url: "http://localhost:5000/shop/createOrder",
      method: "POST", // Hoặc "DELETE" nếu backend h�� tr��
      // headers: { "Content-Type": "application/json" },
      // body: { cartItems: Carts }, // Truyền productId đúng format
    };
    sendRequest(requestConfig);

    navigate("/shop/orders");
  };

  return (
    // <></>
    <div>
      <main>
        {carts.length > 0 ? (
          <>
            <ul className="cart__item-list">
              {carts.map((product) => (
                <li key={product._id} className="cart__item">
                  <h1>{product.title}</h1>
                  <h2>Quantity: {product.quantity}</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      deleteItemHandler(product._id);
                    }}
                  >
                    <input type="hidden" value={product._id} name="productId" />
                    <button className="btn danger" type="submit">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
            <hr />
            <div className="centered">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onOrderNow();
                }}
              >
                <button type="submit" className="btn">
                  Order Now!
                </button>
              </form>
            </div>
          </>
        ) : (
          <h1>No Products in Cart!</h1>
        )}
      </main>
    </div>
  );
};

export default Cart;
