import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [API_URL]);

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) return console.error(data);

      setUsers((prev) =>
        prev.map((u) => (u._id === data.user._id ? data.user : u))
      );
    } catch (error) {
      console.error("Role update failed", error);
      alert("Failed to update role");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100"
      >
        User <span className="text-primary">Management</span>
      </motion.h1>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-3 py-2 text-left text-sm">#</th>
              <th className="px-3 py-2 text-left text-sm">Name</th>
              <th className="px-3 py-2 text-left text-sm">Role</th>
              <th className="hidden md:table-cell px-3 py-2 text-sm">Email</th>
              <th className="hidden lg:table-cell px-3 py-2 text-sm">Phone</th>
              <th className="hidden lg:table-cell px-3 py-2 text-sm">Joined</th>
              <th className="hidden xl:table-cell px-3 py-2 text-sm">Orders</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-gray-100">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>

                <td className="px-3 py-2">
                  <div className="flex items-center gap-2 max-w-45">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                    <span className="truncate">{user.name || "Unknown"}</span>
                  </div>
                </td>

                <td className="px-3 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="
                      w-full max-w-37.5
                      px-2 py-1 text-sm rounded-md
                      bg-white dark:bg-gray-700
                      text-gray-900 dark:text-gray-100
                      border border-gray-300 dark:border-gray-600
                      focus:outline-none focus:ring-2 focus:ring-primary
                    "
                  >
                    <option value="user">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Food Seller</option>
                  </select>
                </td>

                <td className="hidden md:table-cell px-3 py-2 truncate max-w-55">
                  {user.email}
                </td>

                <td className="hidden lg:table-cell px-3 py-2">
                  {user.phone || "-"}
                </td>

                <td className="hidden lg:table-cell px-3 py-2 whitespace-nowrap">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="hidden xl:table-cell px-3 py-2">
                  {user.totalOrders ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
