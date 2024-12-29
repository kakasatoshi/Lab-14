import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./components/shop/Index";
import Product from "./components/shop/Product_List";
import AddProduct from "./components/admin/AddProduct";
import ProductList from "./components/admin/ProductList";
import EditProduct from "./components/admin/EditProduct";
import Product_List from "./components/shop/Product_List";
import Orders from "./components/shop/Orders";
import Cart from "./components/shop/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
        // loader: authLoader,
      },
      {
        path: "/admin/AddProduct",
        element: <AddProduct />,
        // loader: authLoader,
      },
      {
        path: "/admin/ProductList",
        element: <ProductList />,
        // loader: authLoader,
      },
      {
        path: "/admin/EditProduct/:productId",
        element: <EditProduct />,
        // loader: authLoader,
      },
      {
        path: "/shop/products",
        element: <Product_List />,
        // loader: authLoader,
      },
      {
        path: "/shop/cart",
        element: <Cart />,
        // loader: authLoader,
      },
      {
        path: "/shop/orders",
        element: <Orders />,
        // loader: authLoader,
      },
      // Thêm các route con tại đây
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
