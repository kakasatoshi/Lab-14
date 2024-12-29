const Product = require("../models/product");

// API: Lấy form tạo sản phẩm (JSON response)
exports.getAddProduct = (req, res, next) => {
  res.status(200).json({
    message: "Form for adding product",
    editing: false,
  });
};

// API: Thêm sản phẩm mới
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully!",
        product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating product failed!",
        error: err,
      });
    });
};

// API: Lấy thông tin để chỉnh sửa sản phẩm
exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json({
        message: "Product fetched successfully!",
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching product failed!",
        error: err,
      });
    });
};

// API: Chỉnh sửa sản phẩm
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId
  );
  product
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Product updated successfully!",
        product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Updating product failed!",
        error: err,
      });
    });
};

// API: Lấy danh sách sản phẩm
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching products failed!",
        error: err,
      });
    });
};

// API: Xóa sản phẩm
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.status(200).json({
        message: "Product deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deleting product failed!",
        error: err,
      });
    });
};
