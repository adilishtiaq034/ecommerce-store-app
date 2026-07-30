import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartcontext";
import "./cart.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length === 0 || subtotal >= 100 ? 0 : 6.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-empty">
        <span className="cart-empty-icon" aria-hidden="true">🛍️</span>
        <h1>Your cart is empty.</h1>
        <p>Go fill it up with something good.</p>
        <Link to="/" className="continue-shopping-btn">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">£{item.price}</p>
              </div>

              <div className="qty-control">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              <p className="cart-item-line-total">
                £{(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
          </div>
          {subtotal < 100 && (
            <p className="shipping-note">
              Add £{(100 - subtotal).toFixed(2)} more for free shipping.
            </p>
          )}

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">Checkout</button>
          <p className="demo-note">This is a demo store — checkout isn't wired up to real payments.</p>
          <Link to="/" className="continue-link">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
