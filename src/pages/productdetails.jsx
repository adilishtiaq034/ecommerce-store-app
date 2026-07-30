import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import products from "../data/products";
import { CartContext } from "../context/cartcontext";
import ProductCard from "../components/productcard";
import "./productdetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="product-details-page not-found">
        <h1>We couldn't find that product.</h1>
        <Link to="/" className="back-link">
          ← Back to all products
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="product-details-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/?q=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="product-details">
        <div className="product-details-media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>

          <div className="product-rating">
            <span aria-hidden="true">⭐</span>
            <span>{product.rating} rating</span>
          </div>

          <p className="product-description">{product.description}</p>

          <p className="product-details-price">£{product.price}</p>

          <div className="purchase-row">
            <div className="qty-control">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
              {added ? "Added to cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-products">
          <h2>You might also like</h2>
          <div className="related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
