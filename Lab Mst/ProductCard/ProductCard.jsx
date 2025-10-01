import React from "react";
import "./ProductCard.css";

const ProductCard = ({ name, price, description, inStock }) => {
  return (
    <div className="product-card">
      <h2 className="product-title">{name}</h2>
      <p className="product-price">₹{price}</p>
      <p className="product-description">{description}</p>
      {inStock ? (
        <button className="buy-btn">Buy Now</button>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}
    </div>
  );
};

export default ProductCard;
