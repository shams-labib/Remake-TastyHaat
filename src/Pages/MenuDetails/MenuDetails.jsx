import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Truck, ShieldCheck, X } from "lucide-react";
import useAuth from "../../Context/useAuth/useAuth";
import Loader from "../Loader/Loader";

const MenuDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = useAuth();
  const { user, loading: authLoading } = authData || {
    user: null,
    loading: true,
  };

  const [menu, setMenu] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setFetching(true);

    fetch(`${import.meta.env.VITE_API_URL}/menus/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setMenu(data);
          setFetching(false);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        if (isMounted) setFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (authLoading || fetching) return <Loader />;

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!menu)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-xl font-medium text-slate-500">Menu not found</p>
        <Link to="/all-menu" className="btn btn-primary">
          Back to Menu
        </Link>
      </div>
    );

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    const orderData = {
      userId: user.uid,
      username: user.displayName || "Anonymous User",
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

      if (!res.ok) throw new Error("Could not complete the order");

      setShowModal(false);
      navigate("/dashboard/my-orders");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-slate-950 px-4 py-12 lg:py-20 transition-colors">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT: IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-24"
        >
          <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="absolute bottom-8 left-8 bg-orange-500 text-white px-8 py-4 rounded-2xl text-2xl font-black shadow-2xl"
            >
              ${menu.price}
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center py-4"
        >
          <div className="space-y-8">
            <div>
              <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Chef's Special Choice
              </span>
              <h1 className="mt-4 text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                {menu.name}
              </h1>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed italic border-l-4 border-orange-500 pl-4">
              "{menu.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureItem
                icon={<CheckCircle size={20} />}
                text="Fresh Ingredients"
              />
              <FeatureItem
                icon={<ShieldCheck size={20} />}
                text="Hygienic Kitchen"
              />
              <FeatureItem
                icon={<Clock size={20} />}
                text="Prepared in 20-30m"
              />
              <FeatureItem icon={<Truck size={20} />} text="Express Delivery" />
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={!menu.isAvailable || isSubmitting}
                onClick={() => setShowModal(true)}
                className={`w-full md:w-auto px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform 
                  ${
                    menu.isAvailable
                      ? "bg-orange-500 text-white hover:bg-orange-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95"
                      : "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
              >
                {menu.isAvailable ? "Order Now" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] p-10 shadow-3xl overflow-hidden"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                Checkout
              </h2>

              <div className="space-y-4">
                <ModalInput
                  label="Customer Name"
                  value={user.displayName || "Valued Customer"}
                />
                <ModalInput label="Contact Email" value={user.email} />
                <ModalInput label="Selected Item" value={menu.name} />
                <div className="p-4 bg-orange-500/5 rounded-2xl border-2 border-orange-500/20">
                  <p className="text-sm text-orange-600 font-bold uppercase">
                    Total Amount
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    ${menu.price}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  disabled={isSubmitting}
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handleConfirmOrder}
                  className="flex-1 py-4 rounded-2xl bg-orange-500 text-white font-black shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Pay & Confirm"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Sub-components - No TypeScript annotations to avoid Babel errors
const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
    <span className="text-orange-500 bg-orange-500/10 p-2 rounded-lg">
      {icon}
    </span>
    <span className="font-semibold text-sm">{text}</span>
  </div>
);

const ModalInput = ({ label, value }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <input
      readOnly
      value={value}
      className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none border-2 border-transparent"
    />
  </div>
);

export default MenuDetails;
