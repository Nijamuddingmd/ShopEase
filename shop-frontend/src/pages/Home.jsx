import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (pageNum = 1, searchTerm = "") => {
    const { data } = await API.get(
      `/products?page=${pageNum}&search=${encodeURIComponent(searchTerm)}`
    );
    setProducts(data.products);
    setPage(data.page);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchProducts(page, search);
    // eslint-disable-next-line
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(1, search);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Product List</h1>
      <div className="search-container">
        <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #52525b", marginRight: 8 }}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="product-list">
        {products.map(prod => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span style={{ color: "#14b8a6", fontWeight: 600 }}>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
} 