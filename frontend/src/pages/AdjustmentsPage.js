import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProducts } from "../api/product.api";
import { getAdjustments, createAdjustment } from "../api/adjustment.api";

export default function AdjustmentsPage() {
  const [products, setProducts] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 0,
    reason: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load products and adjustments
  const loadData = () => {
    getProducts().then(res => setProducts(res.data));
    getAdjustments().then(res => setAdjustments(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitForm = async (e) => {
  e.preventDefault();

  if (!form.productId) {
    alert("Please select a product.");
    return;
  }

  if (!form.reason.trim()) {
    alert("Please provide a reason.");
    return;
  }

  try {
    await createAdjustment({
      productId: Number(form.productId),
      quantity: Number(form.quantity),
      reason: form.reason,
    });

    setForm({ productId: "", quantity: 0, reason: "" });
    setIsModalOpen(false);
    loadData();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.error || "Failed to create adjustment.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Open Modal Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            New Adjustment
          </button>
        </div>

        {/* Adjustment History Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Adjustment History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Product</th>
                  <th className="px-4 py-2 border">Old Qty</th>
                  <th className="px-4 py-2 border">New Qty</th>
                  <th className="px-4 py-2 border">Reason</th>
                </tr>
              </thead>
              <tbody>
                {adjustments.length > 0 ? (
                  adjustments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{new Date(a.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2 border">{a.Product.name}</td>
                      <td className="px-4 py-2 border">{a.oldQuantity}</td>
                      <td className="px-4 py-2 border">{a.newQuantity}</td>
                      <td className="px-4 py-2 border">{a.reason}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No adjustments recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Adjustment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] p-6 relative overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              New Stock Adjustment
            </h2>

            <form onSubmit={submitForm} className="grid grid-cols-1 gap-4">
              <div>
                <select
                  value={form.productId}
                  onChange={(e) =>
                    setForm({ ...form, productId: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current: {p.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Adjustment (+ / -)"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: +e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Reason"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-2"
              >
                Submit Adjustment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
