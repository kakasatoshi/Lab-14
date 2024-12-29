import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/includes/Mynavbar";
import css from "./layOut.module.css";
// import http from "../http/useHttp";

const Layout = () => {
  //   var methodString = "GET";
  //   var str = "http://localhost:5000/shop/";
  //   const requestConfig = {
  //     url: str,
  //     method: "GET",
  //   };
  //   const { loading, error, Product } = http(requestConfig, methodString); //
  //   console.log(Product);

  return (
    <div>
      <Navbar />
      <div className={css.layout}>
        <Outlet />
      </div>

      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
