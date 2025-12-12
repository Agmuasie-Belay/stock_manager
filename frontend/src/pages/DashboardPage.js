import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import { getTransactions } from "../api/transaction.api";
import { getAdjustments } from "../api/adjustment.api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const navigate = useNavigate();

  // Load all data
  const loadData = () => {
    getProducts().then((res) => setProducts(res.data));
    getTransactions().then((res) => setTransactions(res.data));
    getAdjustments().then((res) => setAdjustments(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const lowStock = products.filter((p) => p.quantity < p.minQuantity);

  // Combine all recent activities: products, transactions, adjustments
  const recentActivities = [
    // Product activities
    ...products.flatMap((p) => {
      const acts = [];
      if (p.createdAt) acts.push({ id: `prod-create-${p.id}`, date: p.createdAt, type: `Product Created: ${p.name}` });
      if (p.updatedAt && p.updatedAt !== p.createdAt) acts.push({ id: `prod-update-${p.id}`, date: p.updatedAt, type: `Product Updated: ${p.name}` });
      if (p.deletedAt) acts.push({ id: `prod-delete-${p.id}`, date: p.deletedAt, type: `Product Deleted: ${p.name}` });
      return acts;
    }),
    // Transaction activities
    ...transactions.flatMap((t) => {
      const acts = [];
      if (t.createdAt) acts.push({ id: `txn-create-${t.id}`, date: t.createdAt, type: `${t.type} Transaction Created: ${t.productName}` });
      if (t.updatedAt && t.updatedAt !== t.createdAt) acts.push({ id: `txn-update-${t.id}`, date: t.updatedAt, type: `${t.type} Transaction Updated: ${t.productName}` });
      if (t.deletedAt) acts.push({ id: `txn-delete-${t.id}`, date: t.deletedAt, type: `${t.type} Transaction Deleted: ${t.productName}` });
      return acts;
    }),
    // Adjustment activities
...adjustments.flatMap((a) => {
  const productName = a.Product?.name || "Unknown Product";
  const acts = [];
  if (a.createdAt) acts.push({ id: `adj-create-${a.id}`, date: a.createdAt, type: `Stock Adjustment Created: ${productName}` });
  if (a.updatedAt && a.updatedAt !== a.createdAt) acts.push({ id: `adj-update-${a.id}`, date: a.updatedAt, type: `Stock Adjustment Updated: ${productName}` });
  if (a.deletedAt) acts.push({ id: `adj-delete-${a.id}`, date: a.deletedAt, type: `Stock Adjustment Deleted: ${productName}` });
  return acts;
}),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10); // latest 10 activities

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Total Products
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {products.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Low Stock Alerts
              </h3>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {lowStock.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Total Transactions
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {transactions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add / View Products
          </button>
          <button
            onClick={() => navigate("/transactions")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Stock In / Out
          </button>
          <button
            onClick={() => navigate("/adjustments")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Adjust Stock
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-2">
            {recentActivities.length > 0 ? (
              recentActivities.map((act) => (
                <li
                  key={act.id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                >
                  <span className="font-medium">{act.type}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(act.date).toLocaleString()}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No recent activities.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
