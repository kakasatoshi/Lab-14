const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching products failed." });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
      res.json({ product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching product failed." });
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching products failed." });
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching cart failed." });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(req.body, "body postCart");
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.json({ message: "Product added to cart.", result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Adding to cart failed." });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.json({ message: "Product removed from cart.", result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Removing from cart failed." });
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => ({
        quantity: i.quantity,
        product: { ...i.productId._doc },
      }));
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.json({ message: "Order placed successfully." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Placing order failed." });
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.json({ orders });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching orders failed." });
    });
};
