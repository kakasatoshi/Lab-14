// import { useState, useEffect } from "react";

// import useHttp from "./useHttp";

// var methodString = "GET";
// var str = "http://localhost:5000/shop/cart";
// const requestConfig = {
//   url: str,
//   method: methodString,
// };

// const useCarts = () => {
//   const { isLoading, error, sendRequest } = useHttp();
//   const [Carts, setCarts] = useState([]);
//   useEffect(() => {
//     const applyData = (data) => {
//       const arr = data.map((e) => ({
//         productData: {
//           id: e.id,
//           title: e.title,
//           price: e.price,
//           imageUrl: e.imageUrl,
//           description: e.description,
//           // quantity: e.quantity,
//           // add more properties as needed...
//         },
//         qty: e.qty,
//       }));

//       // console.log(arr);
//       setCarts(arr);
//     };
//     sendRequest(requestConfig, applyData);
//   }, []);

//   return { isLoading, error, Carts };
// };

// export default useCarts;

// useCart.js

import { useState, useEffect } from "react";
import useHttp from "./useHttp";

const useCarts = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [Carts, setCarts] = useState([]);

  useEffect(() => {
    const applyData = (data) => {
      setCarts(data);
    };

    sendRequest(
      {
        url: "http://localhost:5000/shop/cart",
        method: "GET",
      },
      applyData
    );
  }, []);

  return { isLoading, error, Carts };
};

export default useCarts;
