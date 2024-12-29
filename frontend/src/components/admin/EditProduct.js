import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/forms.css";
import useHttp from "../../http/useHttp";

function EditProduct() {
  const { isLoading, error, sendRequest } = useHttp();
  const location = useLocation();
  const navigate = useNavigate();
  const { editing, product } = location.state || {};
  // console.log(product, editing, "edit product");

  const [title, setTitle] = useState(editing ? product.title : "");
  const [imageUrl, setImageUrl] = useState(editing ? product.imageUrl : "");
  const [price, setPrice] = useState(editing ? product.price : "");
  const [description, setDescription] = useState(
    editing ? product.description : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editing
      ? `http://localhost:5000/admin/edit-product`
      : "http://localhost:5000/admin/add-product";

    const payload = {
      productId: editing ? product._id : "",
      title,
      imageUrl,
      price: parseFloat(price),
      description,
      // createdAt: "",
      // updatedAt: "",
    };

    const requestConfig = {
      url,
      method: editing ? "POST" : "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    };

    try {
      await sendRequest(requestConfig);
      navigate("/admin/ProductList"); // Redirect to product list on success
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <main>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>
      {error && <p className="error-text">Something went wrong: {error}</p>}
    </main>
  );
}

export default EditProduct;
