import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProducts } from "../api/product.api";
import { getTransactions, createTransaction } from "../api/transaction.api";

export default function TransactionsPage() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    productId: 0,
    quantity: 1,
    type: "IN",
    note: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load products & transactions
  const loadData = () => {
    getProducts().then((res) => setProducts(res.data));
    getTransactions().then((res) => setTransactions(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate
    if (!form.productId || form.productId === 0) {
      alert("Please select a product.");
      return;
    }

    if (form.quantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    try {
      await createTransaction({
        ...form,
        type: form.type.toLowerCase(), // fix enum case
      });

      // Reset form and close modal
      setForm({ productId: 0, quantity: 1, type: "IN", note: "" });
      setIsModalOpen(false);

      // Reload data
      loadData();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create transaction.");
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
            New Transaction
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Transaction History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Product</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Note</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {new Date(t.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">{t.productName}</td>
                      <td className="px-4 py-2 border">{t.type}</td>
                      <td className="px-4 py-2 border">{t.quantity}</td>
                      <td className="px-4 py-2 border">{t.note || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
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
              New Transaction
            </h2>

            <form onSubmit={submitForm} className="grid grid-cols-1 gap-4">
              {/* Product */}
              <div>
                <select
                  value={form.productId}
                  onChange={(e) =>
                    setForm({ ...form, productId: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value={0}>Choose Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                  min={1}
                />
              </div>

              {/* Type */}
              <div>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="IN">Stock In</option>
                  <option value="OUT">Stock Out</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <input
                  type="text"
                  placeholder="Note (optional)"
                  value={form.note}
                  onChange={(e) =>
                    setForm({ ...form, note: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-2"
              >
                Submit Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
