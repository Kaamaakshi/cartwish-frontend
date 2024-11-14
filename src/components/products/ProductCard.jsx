import React, { useContext } from "react";
import "./ProductCard.css";
import config from "../../config.json";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import cartContext from "./../../context/cartontext";
import userContext from "./../../context/userContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(cartContext);
  const user = useContext(userContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="product_details">
        <h3 className="product_price">${product?.price}</h3>
        <p className="product_title">${product?.title}</p>
        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>
          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
