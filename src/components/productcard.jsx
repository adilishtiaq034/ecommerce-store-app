import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/cartcontext";
import "./productcard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    // stop the click from bubbling up into the wrapping <Link>
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-media">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>

        <div className="product-body">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            <span aria-hidden="true">⭐</span>
            <span>{product.rating}</span>
          </div>

          <p className="product-price">£{product.price}</p>
        </div>
      </Link>

      <button
        className={`add-to-cart-btn ${justAdded ? "added" : ""}`}
        onClick={handleAddToCart}
      >
        {justAdded ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
