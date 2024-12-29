const Product = require("../models/product");
// const

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.status(200).json({
        message: "Fetched all products successfully",
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching products failed",
        error: err,
      });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        message: "Product fetched successfully",
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching product failed",
        error: err,
      });
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.status(200).json({
        message: "Shop index fetched successfully",
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching index failed",
        error: err,
      });
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.status(200).json({
        message: "Cart fetched successfully",
        cart: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching cart failed",
        error: err,
      });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(
    prodId,
    "\n -------------------------------Post Cart-------------------------------\n"
  );
  Product.findById(prodId)
    .then((product) => {
      console.log(
        req.user.addToCart(product),
        "-----------------req.user.addToCart(product)---------------"
      );
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product added to cart",
        cart: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Adding to cart failed",
        error: err,
      });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.status(200).json({
        message: "Product removed from cart",
        cart: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Removing from cart failed",
        error: err,
      });
    });
};

exports.postOrder = (req, res, next) => {
  console.log(
    "POST Order",
    req.user,
    "--------------------------------",
    req.user.getCart()
  );
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      console.log("Cart", fetchedCart);
      // const products = cart.getProducts();
      console.log("Cart.Products");
      return cart;
    })
    .then((products) => {
      console.log("Products", products);
      return req.user.addOrder().then((order) => {
        console.log("Order", order);
        return order.addProducts(
          products.map((product) => {
            console.log("Product", product);
            product.orderItem = { quantity: product.quantity };
            return product;
          })
        );
      });
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.status(200).json({
        message: "Order placed successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Placing order failed",
        error: err,
      });
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.status(200).json({
        message: "Orders fetched successfully",
        orders: orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching orders failed",
        error: err,
      });
    });
};
