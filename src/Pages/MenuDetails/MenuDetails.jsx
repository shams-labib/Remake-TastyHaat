import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../Context/useAuth/useAuth";
import Loader from "../Loader/Loader";

const MenuDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = useAuth();
  const { user, loading } = authData || { user: null, loading: true };

  const [menu, setMenu] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/menus/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [id]);

  if (loading || fetching) return <Loader />;

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!menu)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Menu not found
      </p>
    );

  const handleConfirmOrder = async () => {
    if (!user || !menu) {
      alert("Invalid order data");
      return;
    }

    const orderData = {
      userId: user.uid,
      username: user.displayName || "User",
      email: user.email,
      menuId: menu._id,
      menuName: menu.name,
      price: menu.price,
      quantity: 1,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      setShowModal(false);
      navigate("/dashboard/my-orders");
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* MAIN SECTION */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          {/* IMAGE */}
          <div className="relative group">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-107.5 object-cover rounded-[28px] shadow-2xl"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-black/25 to-transparent" />

            {/* PRICE */}
            <div className="absolute bottom-6 left-6 bg-primary px-6 py-3 rounded-2xl text-xl font-extrabold text-white shadow-lg">
              ${menu.price}
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 dark:bg-primary/10  text-primary text-sm font-semibold">
              Chef Recommended
            </span>

            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {menu.name}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {menu.description}
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>🍃 Fresh & hygienic ingredients</li>
              <li>👨‍🍳 Handcrafted by expert chefs</li>
              <li>🚚 Fast & safe delivery</li>
            </ul>

            <button
              disabled={!menu.isAvailable}
              onClick={() => setShowModal(true)}
              className={`mt-6 px-12 py-4 rounded-2xl text-lg font-bold transition-all ${
                menu.isAvailable
                  ? "bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)]"
                  : "bg-primary/50 cursor-not-allowed text-slate-200"
              }`}
            >
              Order & Pay
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-[92%] max-w-lg rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <h2 className="text-2xl font-extrabold mb-6 text-slate-900 dark:text-white">
              Payment Details
            </h2>

            <div className="space-y-4">
              <input
                readOnly
                value={user.displayName || "User"}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />

              <input
                readOnly
                value={user.email}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />

              <input
                readOnly
                value={menu.name}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />

              <input
                readOnly
                value={`Total: $${menu.price}`}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 dark:text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="w-1/2 py-3 rounded-xl bg-primary text-white font-bold"
              >
                Confirm Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>
        {`
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
          @keyframes scaleIn {
            from {
              transform: scale(0.88);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default MenuDetails;
