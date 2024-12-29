import { useState, useEffect } from "react";

import useHttp from "./useHttp";

var methodString = "GET";
var str = "http://localhost:5000/shop/";
const requestConfig = {
  url: str,
  method: methodString,
};

const useProducts = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // const applyData = (data) => {
    //   const arr = data.map((e) => ({
    //     id: e.id,
    //     title: e.title,
    //     price: e.price,
    //     imageUrl: e.imageUrl,
    //     description: e.description,
    //     // quantity: e.quantity,
    //     // add more properties as needed...
    //   }));

    //   // console.log(arr);
    //   setProducts(arr);
    // };
    const applyData = (data) => {
      // Lấy mảng products từ JSON trả về
      const arr = data.products.map((e) => ({
        id: e.id,
        title: e.title,
        price: parseFloat(e.price), // Chuyển price thành số thực nếu cần
        imageUrl: e.imageUrl,
        description: e.description,
      }));
      setProducts(arr);
    };

    sendRequest(requestConfig, applyData);
  }, []);

  return { products, isLoading, error };
};

export default useProducts;
