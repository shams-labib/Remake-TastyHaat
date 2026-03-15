import { useState } from "react";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const [payments] = useState([
    {
      _id: "1",
      customerName: "Shafin Ahmed",
      menuName: "Classic Chicken Burger",
      price: 350,
      status: "paid",
      transactionId: "TXN3001",
      paidAt: "2025-12-01T10:30:00",
    },
    {
      _id: "2",
      customerName: "Rafi Hasan",
      menuName: "Spicy Beef Pizza",
      price: 850,
      status: "paid",
      transactionId: "TXN3002",
      paidAt: "2025-12-02T12:15:00",
    },
    {
      _id: "3",
      customerName: "Nafisa Rahman",
      menuName: "Creamy Alfredo Pasta",
      price: 620,
      status: "paid",
      transactionId: "TXN3003",
      paidAt: "2025-12-03T14:45:00",
    },
    {
      _id: "4",
      customerName: "Tanvir Hossain",
      menuName: "Smoky Grilled Chicken",
      price: 720,
      status: "paid",
      transactionId: "TXN3004",
      paidAt: "2025-12-04T18:20:00",
    },
    {
      _id: "5",
      customerName: "Mim Akter",
      menuName: "Healthy Veg Salad Bowl",
      price: 300,
      status: "paid",
      transactionId: "TXN3005",
      paidAt: "2025-12-05T09:10:00",
    },
    {
      _id: "6",
      customerName: "Siam Chowdhury",
      menuName: "Cheesy Club Sandwich",
      price: 280,
      status: "paid",
      transactionId: "TXN3006",
      paidAt: "2025-12-06T11:55:00",
    },
    {
      _id: "7",
      customerName: "Fahim Islam",
      menuName: "Egg Fried Rice Special",
      price: 450,
      status: "paid",
      transactionId: "TXN3007",
      paidAt: "2025-12-07T13:40:00",
    },
    {
      _id: "8",
      customerName: "Ayesha Khan",
      menuName: "Dhakai Chicken Biryani",
      price: 550,
      status: "paid",
      transactionId: "TXN3008",
      paidAt: "2025-12-08T15:25:00",
    },
    {
      _id: "9",
      customerName: "Sabbir Ahmed",
      menuName: "Juicy Beef Kebab Platter",
      price: 600,
      status: "paid",
      transactionId: "TXN3009",
      paidAt: "2025-12-09T17:50:00",
    },
    {
      _id: "10",
      customerName: "Nusrat Jahan",
      menuName: "Traditional Fish Curry",
      price: 480,
      status: "paid",
      transactionId: "TXN3010",
      paidAt: "2025-12-10T19:05:00",
    },
    {
      _id: "11",
      customerName: "Arif Mahmud",
      menuName: "Thai Chicken Soup",
      price: 320,
      status: "paid",
      transactionId: "TXN3011",
      paidAt: "2025-12-11T20:15:00",
    },
    {
      _id: "12",
      customerName: "Jannatul Ferdous",
      menuName: "Butter Naan with Chicken Curry",
      price: 520,
      status: "paid",
      transactionId: "TXN3012",
      paidAt: "2025-12-12T21:30:00",
    },
    {
      _id: "13",
      customerName: "Hasibul Islam",
      menuName: "Loaded Chicken Shawarma",
      price: 430,
      status: "paid",
      transactionId: "TXN3013",
      paidAt: "2025-12-13T22:40:00",
    },
    {
      _id: "14",
      customerName: "Priya Saha",
      menuName: "Paneer Butter Masala",
      price: 590,
      status: "paid",
      transactionId: "TXN3014",
      paidAt: "2025-12-14T23:10:00",
    },
    {
      _id: "15",
      customerName: "Mahmudul Hasan",
      menuName: "BBQ Chicken Wrap",
      price: 410,
      status: "paid",
      transactionId: "TXN3015",
      paidAt: "2025-12-15T08:50:00",
    },
  ]);

  return (
    <div className="p-4 sm:p-6 min-h-screen dark:bg-gray-900 transition-colors">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-white"
      >
        Payment <span className="text-primary">History</span>
      </motion.h1>

      {payments.length === 0 ? (
        <p className="text-center md:text-left text-gray-700 dark:text-gray-300 py-20">
          No payment history found.
        </p>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {payments.map((payment, index) => (
              <div
                key={payment._id || index}
                className="card bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="card-body p-4 space-y-2 text-gray-800 dark:text-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{payment.menuName}</h3>
                    <span className={`badge badge-success`}>Paid</span>
                  </div>

                  <p className="text-sm">
                    <strong>Customer:</strong> {payment.customerName}
                  </p>

                  <p className="text-sm">
                    <strong>Price:</strong> ৳{payment.price}
                  </p>

                  <p className="text-sm">
                    <strong>Transaction:</strong> {payment.transactionId}
                  </p>

                  <p className="text-sm">
                    <strong>Paid At:</strong>{" "}
                    {new Date(payment.paidAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl shadow">
            <table className="table w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Menu Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                  <th>Paid Time</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id || index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <th>{index + 1}</th>
                    <td>{payment.customerName}</td>
                    <td>{payment.menuName}</td>
                    <td>৳{payment.price}</td>
                    <td>
                      <span className="badge badge-success">Paid</span>
                    </td>
                    <td className="text-xs">{payment.transactionId}</td>
                    <td>{new Date(payment.paidAt).toLocaleString()}</td>
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

export default PaymentHistory;
