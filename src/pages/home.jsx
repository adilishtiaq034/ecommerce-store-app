import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./homepage.css";

import products from "../data/products";
import ProductCard from "../components/productcard";

const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

function Home() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    let list = products;

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [category, query, sort]);

  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">
          Good stuff, <em>honestly priced.</em>
        </h1>
      </section>

      <section className="shelf" aria-label="Categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`shelf-pill ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <div className="catalog-bar">
        <p className="catalog-count">
          {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "item" : "items"}
          {query && <> for &ldquo;{query}&rdquo;</>}
        </p>

        <label className="sort-control">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </label>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="empty-shelf">
          <h2>Nothing on this shelf.</h2>
          <p>Try a different category or search term.</p>
        </div>
      ) : (
        <div className="products-container">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
