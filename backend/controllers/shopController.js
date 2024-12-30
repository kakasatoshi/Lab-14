const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching products failed.',
        error: err
      });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json({
        message: 'Fetched product successfully.',
        product: product
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching product failed.',
        error: err
      });
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({
        message: 'Fetched products successfully for index page.',
        products: products
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching products failed for index page.',
        error: err
      });
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.status(200).json({
        message: 'Fetched cart successfully.',
        cart: products
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching cart failed.',
        error: err
      });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.status(200).json({
        message: 'Added product to cart successfully.',
        cart: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Adding product to cart failed.',
        error: err
      });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.status(200).json({
        message: 'Removed product from cart successfully.',
        cart: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Removing product from cart failed.',
        error: err
      });
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status
