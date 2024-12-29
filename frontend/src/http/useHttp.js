import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  //   const [product, setProduct] = useState([]);

  const sendRequest = async (requestConfig, applyData) => {
    setIsLoading(true);
    setErr(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const data = await response.json();

      applyData(data);
    } catch (err) {
      setErr(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading: isLoading,
    error: err,
    sendRequest,
  };
};

export default useHttp;
