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
          })),
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
      <p className="p-6 text-gray-900 dark:text-gray-100 animate-pulse">
        Loading orders...
      </p>
    );
  if (error) return <p className="p-6 text-red-500 font-medium">{error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-10 text-gray-900 dark:text-white"
      >
        Manage <span className="text-primary">Orders</span>
      </motion.h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentOrders.map((order) => (
          <motion.div
            layout
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
              {order.name}
            </h2>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 break-all">
              <span className="font-medium">User:</span> {order.createdBy}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                {order.category}
              </span>
              <span className="px-2.5 py-0.5 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300 rounded-full text-[10px] sm:text-xs font-semibold">
                {order.unit}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase ${
                  order.status === "pending"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-end border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
              <div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">
                  Total Cost
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  ${order.cost.toLocaleString()}
                </p>
              </div>
              <div className="text-right text-[10px] sm:text-xs text-gray-400">
                {order.createdAt}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-8 gap-2 pb-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Scrollable Page Numbers for  */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none px-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-[35px] h-[35px] flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                currentPage === i + 1
                  ? "bg-primary border-primary text-white shadow-md scale-105"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ManageOrders;
