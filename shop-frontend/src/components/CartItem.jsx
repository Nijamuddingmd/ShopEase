export default function CartItem({ item, onUpdate, onRemove }) {
  const price = item.product.price;
  const subtotal = price * item.quantity;

  return (
    <div className="cart-item">
      <span className="cart-item-name">
        {item.product.name} x {item.quantity} &nbsp;
        <span style={{ color: "#212121", fontWeight: 400 }}>
          @ Rs {item.product.price} = <strong>Rs {item.product.price * item.quantity}</strong>
        </span>
      </span>
      <div className="cart-item-controls">
        <button onClick={() => onUpdate(item._id, item.quantity + 1)}>+</button>
        <button onClick={() => onUpdate(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
        <button onClick={() => onRemove(item._id)}>Remove</button>
      </div>
    </div>
  );
} 