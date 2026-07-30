import "./footer.css";
import { Link } from "react-router-dom";
import products from "../data/products";

const CATEGORIES = [...new Set(products.map((p) => p.category))].slice(0, 5);

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-brand">
          <span className="brand-mark">A</span>
          <p>Adil Mart — the everyday things worth getting right.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/?q=${encodeURIComponent(cat)}`}>
              {cat}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">Track an Order</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>New arrivals, restocks, occasional good deals.</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="you@email.com" aria-label="Email address" />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Adil Mart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
