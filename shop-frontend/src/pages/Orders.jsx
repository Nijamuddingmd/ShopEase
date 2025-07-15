import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Orders</h2>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", color: "#2563eb", fontWeight: 500 }}>
            No orders yet.
          </div>
        ) : (
          orders.map(order => (
            <div
              key={order._id}
              style={{
                background: "#fff",
                borderRadius: 16,
                marginBottom: "2rem",
                padding: "1.5rem 2rem",
                boxShadow: "0 4px 24px #0001"
              }}
            >
              <div style={{ color: "#2563eb", fontWeight: 600 }}>
                Status: {order.status}
              </div>
              <div style={{ margin: "0.5rem 0" }}>
                <strong>Total:</strong> ${order.totalPrice}
              </div>
              <ul>
                {order.orderItems.map(item => (
                  <li key={item._id}>
                    {item.product.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 