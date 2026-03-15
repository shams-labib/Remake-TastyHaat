import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/orders`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error loading orders:", err))
      .finally(() => setLoading(false));
  }, []);

  const handlePay = async (order) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(order.price) * Number(order.quantity || 1),
            userEmail: order.email,
            userName: order.username,
            description: order.menuName,
          }),
        }
      );

      const data = await res.json();

      if (data?.url) {
        setRedirectUrl(data.url);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  useEffect(() => {
    if (redirectUrl) {
      window.open(redirectUrl, "_self");
    }
  }, [redirectUrl]);

  const pendingOrders = orders.filter((order) => order.status === "pending");

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen text-gray-800 dark:text-base-200">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-12"
      >
        My <span className="text-primary">Orders</span>
      </motion.h1>

      {pendingOrders.length === 0 ? (
        <p className="text-center text-base-content/60">
          No pending orders found.
        </p>
      ) : (
        <>
          <div className="space-y-4 md:hidden">
            {pendingOrders.map((order, index) => (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-base-100 shadow-md border border-red-600"
              >
                <div className="card-body p-4 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{order.menuName}</h3>
                    <span className="badge badge-warning">Pending</span>
                  </div>

                  <p className="text-sm">
                    <strong>Price:</strong> ${order.price}
                  </p>

                  <p className="text-sm">
                    <strong>Time:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <button
                    className="btn btn-sm btn-primary w-full mt-2"
                    onClick={() => handlePay(order.menuId)}
                  >
                    Pay
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="idden md:block overflow-x-auto rounded-xl shadow">
            {" "}
            <table className="table w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order, index) => (
                  <motion.tr
                    key={order._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <th>{index + 1}</th>
                    <td>{order.menuName}</td>
                    <td>${order.price}</td>
                    <td>
                      <span className="badge badge-warning">Pending</span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePay(order)}
                      >
                        Pay
                      </button>
                    </td>
                  </motion.tr>
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
