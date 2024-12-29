import React from "react";
import { useLocation } from "react-router-dom";
import "../../css/main.css";

const MyNavBar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <div className="backdrop"></div>
      <header className="main-header">
        <button id="side-menu-toggle">Menu</button>
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <li className="main-header__item">
              <a className={isActive("/")} href="/">
                Shop
              </a>
            </li>
            <li className="main-header__item">
              <a className={isActive("/products")} href="/shop/products">
                Products
              </a>
            </li>
            <li className="main-header__item">
              <a className={isActive("/cart")} href="/shop/cart">
                Cart
              </a>
            </li>
            <li className="main-header__item">
              <a className={isActive("/shop/orders")} href="/shop/orders">
                Orders
              </a>
            </li>
            <li className="main-header__item">
              <a
                className={isActive("/admin/add-product")}
                href="/admin/AddProduct"
              >
                Add Product
              </a>
            </li>
            <li className="main-header__item">
              <a
                className={isActive("/admin/products")}
                href="/admin/ProductList"
              >
                Admin Products
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <nav className="mobile-nav">
        <ul className="mobile-nav__item-list">
          <li className="mobile-nav__item">
            <a className={isActive("/")} href="/">
              Shop
            </a>
          </li>
          <li className="mobile-nav__item">
            <a className={isActive("/products")} href="/products">
              Products
            </a>
          </li>
          <li className="mobile-nav__item">
            <a className={isActive("/cart")} href="/cart">
              Cart
            </a>
          </li>
          <li className="mobile-nav__item">
            <a className={isActive("/orders")} href="/orders">
              Orders
            </a>
          </li>
          <li className="mobile-nav__item">
            <a
              className={isActive("/admin/add-product")}
              href="/admin/add-product"
            >
              Add Product
            </a>
          </li>
          <li className="mobile-nav__item">
            <a className={isActive("/admin/products")} href="/admin/products">
              Admin Products
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MyNavBar;
