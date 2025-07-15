import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const updateItem = async (itemId, quantity) => {
    if (quantity < 1) return;
    const item = cart.find(i => i._id === itemId);
    await API.post("/cart", { productId: item.product._id, quantity });
    fetchCart();
  };

  const removeItem = async (itemId) => {
    await API.delete(`/cart/${itemId}`);
    fetchCart();
  };

  const clearCart = async () => {
    await API.delete("/cart");
    fetchCart();
  };

  const placeOrder = async () => {
    const shippingInfo = {
      address: "123 Main St",
      city: "Metropolis",
      postalCode: "12345",
      country: "Country"
    };
    await API.post("/orders", { shippingInfo });
    fetchCart();
    alert("Order placed!");
    navigate("/orders");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Cart</h2>
      <div className="cart-container" style={{
        background: "#fff",
        borderRadius: 16,
        maxWidth: 700,
        margin: "0 auto",
        padding: "2.5rem 2rem",
        boxShadow: "0 4px 24px #0001"
      }}>
        {cart.length === 0 ? (
          <div style={{
            textAlign: "center",
            color: "#212121", // black text
            fontWeight: 500
          }}>
            Your cart is empty.
          </div>
        ) : (
          <>
            {cart.map(item => (
              <CartItem key={item._id} item={item} onUpdate={updateItem} onRemove={removeItem} />
            ))}
            {/* Place the total here */}
            <div style={{
              textAlign: "right",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#212121", // black text
              margin: "1.5rem 0 1rem 0"
            }}>
              Total: Rs {total}
            </div>
            <div className="cart-actions">
              <button onClick={clearCart}>Clear Cart</button>
              <button onClick={placeOrder}>Place Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 