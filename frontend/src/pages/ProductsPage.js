import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/product.api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    sku: "",
    quantity: 0,
    minQuantity: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProducts = () => getProducts().then((res) => setProducts(res.data));

  useEffect(() => {
    loadProducts();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateProduct(form.id, form);
    } else {
      await createProduct(form);
    }
    setForm({ id: null, name: "", sku: "", quantity: 0, minQuantity: 0 });
    setIsModalOpen(false);
    loadProducts();
  };

  const editProduct = (p) => {
    setForm({ ...p });
    setIsModalOpen(true);
  };

  const removeProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Quick Add Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setForm({ id: null, name: "", sku: "", quantity: 0, minQuantity: 0 });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Products List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">SKU</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Min Qty</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{p.name}</td>
                    <td className="px-4 py-2 border">{p.sku}</td>
                    <td className="px-4 py-2 border">{p.quantity}</td>
                    <td className="px-4 py-2 border">{p.minQuantity}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => editProduct(p)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] p-6 relative overflow-y-auto">
      {/* Close Button with red shadow */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold shadow-red-500/50 shadow-lg"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {form.id ? "Edit Product" : "Add New Product"}
      </h2>

      {/* Modal Form */}
      <form onSubmit={submitForm} className="grid grid-cols-1 gap-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Enter the product name.</p>
        </div>

        {/* SKU */}
        <div>
          <input
            type="text"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Unique stock keeping unit.</p>
        </div>

        {/* Category */}
        <div>
          <input
            type="text"
            placeholder="Category"
            value={form.category || ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">Optional product category.</p>
        </div>

        {/* Unit */}
        <div>
          <input
            type="text"
            placeholder="Unit (pcs, kg, etc.)"
            value={form.unit || ""}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">Unit of measurement.</p>
        </div>

        {/* Quantity */}
        <div>
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Current stock quantity.</p>
        </div>

        {/* Minimum Stock */}
        <div>
          <input
            type="number"
            placeholder="Minimum Stock"
            value={form.minStock || 0}
            onChange={(e) => setForm({ ...form, minStock: +e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Alert level for low stock.</p>
        </div>

        {/* Cost */}
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Cost"
            value={form.cost || 0}
            onChange={(e) => setForm({ ...form, cost: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">Unit cost of the product.</p>
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price || 0}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">Selling price of the product.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-2"
        >
          {form.id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  </div>
)}


    </div>
  );
}
