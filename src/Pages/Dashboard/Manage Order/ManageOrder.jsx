// ManageOrders.jsx
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Context/useaxios/useAxiosSecure";
import { motion } from "framer-motion";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/orders");
        setOrders(
          res.data.map((order) => ({
            id: order._id,
            name: order.menuName,
            category: "Home",
            unit: "per_event",
            cost: order.price,
            createdBy: order.email,
            status: order.status,
            createdAt: new Date(order.createdAt).toLocaleDateString(),
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [axiosSecure]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  if (loading)
    return (
      <p className="p-6 text-gray-900 dark:text-gray-100">Loading orders...</p>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <motion.h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        Manage <span className="text-primary">Orders</span>
      </motion.h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {order.name}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              Ordered by: {order.createdBy}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 bg-primary/10 text-primary dark:bg-primary/70 dark:text-blue-100 rounded-full text-xs font-medium">
                {order.category}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full text-xs font-medium">
                {order.unit}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1">
              Cost:{" "}
              <span className="font-semibold">
                ${order.cost.toLocaleString()}
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              Ordered on: {order.createdAt}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === i + 1
                ? "bg-primary border-primary text-white"
                : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            } transition-colors`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageOrders;
