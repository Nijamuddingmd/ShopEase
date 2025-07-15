import { Link } from "react-router-dom";
import API from "../api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import batImg from '../assets/bat.webp';

function getImageSrc(image) {
  if (image && image.startsWith('/uploads')) {
    return `http://localhost:5000${image}`;
  }
  if (image === 'bat.webp') {
    return batImg;
  }
  return '';
}

export default function ProductCard({ product }) {
  const { fetchCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart", { productId: product._id, quantity: 1 });
      fetchCart();
      alert(`${product.name} added to cart!`);
    } catch (err) {
      alert("You must be logged in to add to cart.");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h2>{product.name}</h2>
        {product.image && (
          <img
            src={getImageSrc(product.image)}
            alt={product.name}
            style={{
              width: 180,
              height: 180,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 8,
              cursor: "pointer"
            }}
          />
        )}
        <p style={{ marginBottom: 0 }}>{product.description}</p>
      </Link>
      {/* Price and Add to Cart button directly under description */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: "0.5rem",
        marginLeft: "auto",
        marginRight: "auto",
        width: "fit-content"
      }}>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Rs {product.price}</span>
        <button onClick={handleAddToCart} style={{ padding: "0.4rem 1rem" }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
} 