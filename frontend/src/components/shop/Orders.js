import React, { useEffect, useState } from "react";
import useHttp from "../../http/useHttp";

const Orders = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [orders, setOrders] = useState([]);

  const applyData = (data) => {
    console.log(data);
    setOrders(data.orders);
  };

  useEffect(() => {
    const requestConfig = {
      url: "http://localhost:5000/shop/orders", // Địa chỉ API của bạn
    };

    sendRequest(requestConfig, applyData);
  }, []);

  return (
    <>
      <main>
        {orders.length <= 0 ? (
          <h1>Nothing there!</h1>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <h1># {order._id}</h1>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.title} ({product.quantity})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

// Example of Head, Navigation, and End components

export default Orders;
