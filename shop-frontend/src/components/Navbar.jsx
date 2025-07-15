import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo" style={{ fontWeight: 700, fontSize: 24, color: '#2563eb', letterSpacing: 1 }}>
          🛍️ ShopEase
        </span>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        {user ? (
          <>
            <span style={{ margin: '0 0.5rem', color: '#22223b', fontWeight: 500 }}>Hi, {user.name}</span>
            {user.isAdmin && <Link to="/admin/products">Admin</Link>}
            <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
} 