import { useEffect, useState } from "react";
import API from "../api";
import ProductForm from "../components/ProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = () => {
    API.get("/products").then(res => setProducts(res.data.products || res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data) => {
    await API.post("/products", data);
    fetchProducts();
  };

  const handleEdit = (product) => setEditing(product);

  const handleUpdate = async (data) => {
    await API.put(`/products/${editing._id}`, data);
    setEditing(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Admin Product Management</h2>
      <ProductForm onSubmit={editing ? handleUpdate : handleCreate} initial={editing} />
      <ul>
        {products.map(prod => (
          <li key={prod._id}>
            {prod.name} - ${prod.price}
            <button onClick={() => handleEdit(prod)}>Edit</button>
            <button onClick={() => handleDelete(prod._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 