const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Add Product page data',
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product created successfully!',
        product: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Creating a product failed.',
        error: err
      });
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.status(400).json({ message: 'Edit mode not provided.' });
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json({
        message: 'Edit Product page data',
        product: product,
        editing: editMode
      });
    })
    .catch(err => res.status(500).json({ message: 'Fetching product failed.', error: err }));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Product updated successfully!',
        product: result
      });
    })
    .catch(err => res.status(500).json({ message: 'Updating product failed.', error: err }));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products
      });
    })
    .catch(err => res.status(500).json({ message: 'Fetching products failed.', error: err }));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.status(200).json({ message: 'Product deleted successfully.' });
    })
    .catch(err => res.status(500).json({ message: 'Deleting product failed.', error: err }));
};
