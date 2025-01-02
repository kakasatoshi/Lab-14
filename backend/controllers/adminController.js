const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.json({
    message: "Add Product Page",
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.status(201).json({
        message: "Product created successfully",
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Creating product failed" });
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching product failed" });
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.json({
        message: "Product updated successfully",
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Updating product failed" });
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching products failed" });
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Deleting product failed" });
    });
};
