import "./navbar.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/cartcontext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand-link">
        <span className="brand-mark">A</span>
        <h2>Adil Mart</h2>
      </Link>

      <form className="nav-search" onSubmit={handleSearch} role="search">
        <span aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Search the store..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
      </form>

      <div className="nav-links">
        <Link to="/" className="nav-text-link">Home</Link>

        <Link to="/cart" className="nav-cart">
          <span aria-hidden="true">🛍️</span>
          <span>Cart</span>
          {itemCount > 0 && <span className="nav-cart-count">{itemCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
