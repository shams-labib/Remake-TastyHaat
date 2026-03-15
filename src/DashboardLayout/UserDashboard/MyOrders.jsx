import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../Context/useAuth/useAuth";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      const apiUrl = `${import.meta.env.VITE_API_URL}/orders?email=${user.email}`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error loading orders:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  const handlePay = async (order) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(order.price) * Number(order.quantity || 1),
            userEmail: user?.email,
            userName: user?.displayName,
            description: order.menuName,
            orderId: order._id, // track korar jonno orderId o pathate paren
          }),
        },
      );

      const data = await res.json();
      if (data?.url) {
        // window.open use na kore direct redirect kora mobile-e beshi smooth
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const pendingOrders = orders.filter((order) => order.status === "pending");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl md:text-4xl font-black mb-8 dark:text-white"
      >
        My <span className="text-primary">Orders</span>
      </motion.h1>

      {pendingOrders.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-3xl">
          <p className="text-base-content/60 font-medium italic">
            No pending orders found. Start ordering now! 🍕
          </p>
        </div>
      ) : (
        <>
          {/* MOBILE VIEW: Cards (Vertical Layout) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {pendingOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg dark:text-white leading-tight">
                      {order.menuName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="badge badge-warning badge-sm font-bold">
                    Pending
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary font-black text-xl">
                    ${order.price}
                  </span>
                  <button
                    className="btn btn-primary btn-sm px-6 rounded-lg font-bold"
                    onClick={() => handlePay(order)}
                  >
                    Pay Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP VIEW: Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl">
            <table className="table w-full bg-white dark:bg-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
                <tr className="border-none">
                  <th className="py-4">#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="dark:text-gray-200">
                {pendingOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <th>{index + 1}</th>
                    <td className="font-semibold">{order.menuName}</td>
                    <td className="font-bold text-primary">${order.price}</td>
                    <td>
                      <span className="badge badge-warning font-semibold">
                        Pending
                      </span>
                    </td>
                    <td className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary px-4 rounded-md"
                        onClick={() => handlePay(order)}
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
