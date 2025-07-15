import { useState, useEffect } from "react";
import API from "../api";

export default function ProductForm({ initial, onSubmit }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      countInStock: "",
    }
  );

  // Update form when initial changes (for editing)
  useEffect(() => {
    setForm(
      initial || {
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        countInStock: "",
      }
    );
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, image: data.imageUrl });
    } catch (err) {
      alert("Image upload failed");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {uploading && <span>Uploading...</span>}
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
} 