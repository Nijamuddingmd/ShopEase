import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { CartContext } from "../context/CartContext";
import batImg from '../assets/bat.webp'; // import all your static images as needed

function getImageSrc(image) {
  // If the image path starts with /uploads, it's an uploaded image
  if (image && image.startsWith('/uploads')) {
    return `http://localhost:5000${image}`;
  }
  // If the image matches a static asset, return the imported asset
  if (image === 'bat.webp') {
    return batImg;
  }
  // Fallback: return a placeholder or nothing
  return '';
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { fetchCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    await API.post("/cart", { productId: id, quantity });
    fetchCart();
    alert("Added to cart!");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      {product.image && (
        <img
          src={getImageSrc(product.image)}
          alt={product.name}
          style={{ width: "100%", maxWidth: 200, borderRadius: 8, marginBottom: 8 }}
        />
      )}
      <p>{product.description}</p>
      <p>${product.price}</p>
      <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
} 