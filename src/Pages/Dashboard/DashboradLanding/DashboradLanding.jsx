import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaPlusCircle,
  FaShoppingBag,
  FaUser,
  FaUsersCog,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../Context/useAuth/useAuth";
import useRole from "../../../hooks/useRole";
import Loader from "../../Loader/Loader";

const INITIAL_STATS = [
  { title: "Total Menus", value: 12, icon: <FaUtensils size={26} /> },
  { title: "Active Menus", value: 9, icon: <FaShoppingBag size={26} /> },
  { title: "Pending Orders", value: 5, icon: <FaUser size={26} /> },
  { title: "New Today", value: 2, icon: <FaPlusCircle size={26} /> },
];

const DashboardLanding = () => {
  const { user } = useAuth();
  const { role, isLoading } = useRole(user);
  const [stats] = useState(INITIAL_STATS);

  if (isLoading) return <Loader />;

  const roleButtons = {
    user: [
      {
        to: "/all-menu",
        text: "Place Orders",
        icon: <FaUtensils />,
        style: "btn-primary",
      },
      {
        to: "/dashboard/my-orders",
        text: "View Orders",
        icon: <FaShoppingBag />,
        style: "btn-secondary",
      },
    ],
    seller: [
      {
        to: "/dashboard/add-menu",
        text: "Add New Menu",
        icon: <FaPlusCircle />,
        style: "btn-primary",
      },
      {
        to: "/dashboard/my-menus",
        text: "Posted Menus",
        icon: <FaClipboardList />,
        style: "btn-secondary",
      },
    ],
    admin: [
      {
        to: "/dashboard/manage-orders",
        text: "Manage Orders",
        icon: <FaClipboardList />,
        style: "btn-primary",
      },
      {
        to: "/dashboard/users-management",
        text: "Users Management",
        icon: <FaUsersCog />,
        style: "btn-secondary",
      },
    ],
  };

  const buttons = roleButtons[role] || roleButtons.user;

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-base-200">
          Welcome back,{" "}
          <span className="text-primary">{user?.displayName || "User"}</span> 👋
        </h1>
        <p className="mt-2 text-gray-900 dark:text-base-200">
          Manage your menus, track activity, and grow your business.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-base-100 dark:bg-gray-800 shadow-xl"
          >
            <div className="card-body flex-row items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-base-content/60 dark:text-gray-300">
                  {stat.title}
                </p>
                <h2 className="text-2xl font-bold dark:text-gray-100">
                  {stat.value}
                </h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Role-based Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {buttons.map((btn, index) => (
          <Link key={index} to={btn.to}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`btn ${btn.style} w-full py-6 text-lg flex items-center justify-center gap-2`}
            >
              {btn.icon} {btn.text}
            </motion.button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardLanding;
