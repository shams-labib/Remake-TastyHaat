// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { LucideUser, LucideShoppingCart, LucideMenu } from "lucide-react";
import useAxiosSecure from "../../../Context/useaxios/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // State
  const [summary, setSummary] = useState({
    members: 0,
    orders: 0,
    menus: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data from server
        const [usersRes, ordersRes, menusRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/orders"),
          axiosSecure.get("/menus"),
        ]);

        const users = usersRes.data;
        const orders = ordersRes.data;
        const menus = menusRes.data;

        // Set summary
        setSummary({
          members: users.length,
          orders: orders.length,
          menus: menus.length,
        });

        // Generate chartData (last 6 months)
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const now = new Date();
        const months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          return {
            month: monthNames[d.getMonth()],
            orders: 0,
            members: 0,
            menus: 0,
          };
        }).reverse();

        // Populate chart data
        months.forEach((m) => {
          orders.forEach((o) => {
            const orderMonth = new Date(o.createdAt).getMonth();
            if (monthNames[orderMonth] === m.month) m.orders += 1;
          });
          users.forEach((u) => {
            const userMonth = new Date(u.createdAt).getMonth();
            if (monthNames[userMonth] === m.month) m.members += 1;
          });
          menus.forEach((menu) => {
            const menuMonth = new Date(menu.createdAt).getMonth();
            if (monthNames[menuMonth] === m.month) m.menus += 1;
          });
        });

        setChartData(months);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  if (loading)
    return (
      <p className="p-6 text-gray-900 dark:text-gray-100">
        Loading dashboard...
      </p>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
          <LucideUser className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Total Members</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {summary.members}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
          <LucideShoppingCart className="w-10 h-10 text-purple-500" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {summary.orders}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
          <LucideMenu className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Total Menus</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {summary.menus}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Orders Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ccc"
                className="dark:stroke-gray-700"
              />
              <XAxis
                dataKey="month"
                stroke="#333"
                className="dark:stroke-gray-100"
              />
              <YAxis stroke="#333" className="dark:stroke-gray-100" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#333" }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#7c3aed"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Members Growth Area Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Members Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#333"
                className="dark:stroke-gray-100"
              />
              <YAxis stroke="#333" className="dark:stroke-gray-100" />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ccc"
                className="dark:stroke-gray-700"
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#333" }}
              />
              <Area
                type="monotone"
                dataKey="members"
                stroke="#3b82f6"
                fill="url(#colorMembers)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders vs Members Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Orders vs Members
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ccc"
                className="dark:stroke-gray-700"
              />
              <XAxis
                dataKey="month"
                stroke="#333"
                className="dark:stroke-gray-100"
              />
              <YAxis stroke="#333" className="dark:stroke-gray-100" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#333" }}
              />
              <Bar dataKey="orders" fill="#7c3aed" />
              <Bar dataKey="members" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
