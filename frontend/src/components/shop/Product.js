import React from "react";
import "../../css/main.css";
import AddToCart from "../includes/AddToCart";
const Product = (props) => {
  // console.log("Productee", props);
  const { _id, title, imageUrl, price, description } = props.product;
  // console.log("Product", _id, title, imageUrl, price, description);
  // console.log("Product", title, imageUrl, price, description);
  // console.log("ProductID", _id);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(_id, "Form submitted");

    // Add your code to handle form submission here
  };
  return (
    <div className={"Cart"}>
      <div className={"product-form"}>
        <div className={"product-item"}>
          <h2 className={"product__title"}>{title}</h2>
          <div className={"card__image"}>
            <img src={imageUrl} alt={title} />
          </div>

          <p className={"product__price"}>{price}</p>
          <p className={"product__description"}>{description}</p>
          <form className={"product-form"} onSubmit={handleSubmit}>
            <button onClick={() => console.log("Details clicked")}>
              Details
            </button>
          </form>
          <AddToCart id={props.product._id} />
          {/* {console.log(props.product._id, "product")} */}
        </div>
      </div>
    </div>
  );
};

export default Product;
