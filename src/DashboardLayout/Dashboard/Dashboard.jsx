import React, { useState } from "react";
import {
  FaFileInvoiceDollar,
  FaClipboardList,
  FaUser,
  FaUserShield,
  FaUsersCog,
  FaPlusCircle,
  FaUtensils,
  FaShoppingBag,
} from "react-icons/fa";
import Logo from "../../Components/shared/Logo/Logo";
import { NavLink, Outlet } from "react-router";
import { Home, Menu, X } from "lucide-react";
import useAuth from "../../Context/useAuth/useAuth";
import useRole from "../../hooks/useRole";
import Loader from "../../Pages/Loader/Loader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(user);

  if (loading || isLoading || !user || !role) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-50 min-h-screen w-64 bg-white dark:bg-gray-800 shadow-xl flex flex-col transform transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center py-6 border-b border-gray-200 dark:border-gray-700">
          <Logo />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4">
            Dashboard
          </h2>
        </div>

        <div className="px-4 py-6 space-y-2">
          {/* Common routes for all users */}
          <SidebarItem
            to="/"
            icon={<Home size={22} />}
            text="Home"
            onClick={() => setSidebarOpen(false)}
          />
          <SidebarItem
            to="/dashboard/profile"
            icon={<FaUser size={22} />}
            text="Profile"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Conditional routes based on role */}
          {role === "user" && (
            <>
              <SidebarItem
                to="/dashboard/my-orders"
                icon={<FaShoppingBag size={22} />}
                text="My Orders"
                onClick={() => setSidebarOpen(false)}
              />
              <SidebarItem
                to="/all-menu"
                icon={<FaUtensils size={22} />}
                text="Place Orders"
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}

          {role === "seller" && (
            <>
              <SidebarItem
                to="/dashboard/add-menu"
                icon={<FaPlusCircle size={22} />}
                text="Add Menu"
                onClick={() => setSidebarOpen(false)}
              />
              <SidebarItem
                to="/dashboard/my-menus"
                icon={<FaClipboardList size={22} />}
                text="Posted Menus"
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}

          {role === "admin" && (
            <>
              <SidebarItem
                to="/dashboard/admin"
                icon={<FaUserShield size={22} />}
                text="Admin"
                onClick={() => setSidebarOpen(false)}
              />
              <SidebarItem
                to="/dashboard/users-management"
                icon={<FaUsersCog size={22} />}
                text="Users Management"
                onClick={() => setSidebarOpen(false)}
              />
              <SidebarItem
                to="/dashboard/manage-orders"
                icon={<FaClipboardList size={22} />}
                text="Manage Orders"
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}

          <SidebarItem
            to="/dashboard/payment-history"
            icon={<FaFileInvoiceDollar size={22} />}
            text="Payment History"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-800 dark:text-white"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </span>
        </div>

        <main className="flex-1 p-4 lg:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200
      ${
        isActive
          ? "bg-primary/10 dark:bg-gray-900 text-primary font-semibold"
          : "text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-900"
      }`
    }
  >
    {icon}
    <span>{text}</span>
  </NavLink>
);

export default DashboardLayout;
