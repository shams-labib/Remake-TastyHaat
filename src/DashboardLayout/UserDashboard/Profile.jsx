import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  ShieldCheck,
  Briefcase,
  Save,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "./../../Context/useAuth/useAuth";
import Loader from "./../../Pages/Loader/Loader";
import { Link } from "react-router";

const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const MyProfile = () => {
  const { user, setUser } = useAuth();
  console.log(user);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location || "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) return <Loader />;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-10">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={cardAnim}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <div className="rounded-3xl bg-base-100 dark:bg-gray-900 shadow-xl overflow-hidden">
          <div className="flex flex-col items-center p-6 bg-linear-to-br from-orange-500 to-red-500 text-white">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-white ring-offset-4 ring-offset-orange-500 shadow-lg hover:scale-105 transition-transform">
                <img
                  src={user.photoURL || "https://i.ibb.co/7QpKsCX/user.png"}
                  className="h-full w-full object-cover"
                  alt="profile"
                />
              </div>
            </div>

            {!editing ? (
              <>
                <h2 className="mt-4 text-xl font-bold">
                  {user.displayName || "User"}
                </h2>
                <p className="text-sm opacity-90 flex items-center gap-1 mt-1">
                  <Briefcase className="w-4 h-4" /> {user.role || "Food Lover"}
                </p>
              </>
            ) : (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="mt-4 text-center text-xl font-bold px-3 py-2 rounded-lg text-black dark:text-white w-full bg-white dark:bg-gray-700"
                placeholder="Enter name"
              />
            )}

            <span className="mt-3 badge badge-success gap-1 rounded-full px-3 py-1 shadow">
              <ShieldCheck className="w-3 h-3" /> Active User
            </span>
          </div>

          <div className="p-5 flex flex-col gap-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary btn-sm w-full flex gap-2 hover:scale-105 transition-transform"
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn btn-success btn-sm flex-1 flex gap-2 justify-center items-center"
                >
                  <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="btn btn-error btn-sm flex-1 flex gap-2 justify-center items-center"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT INFO CARD */}
        <div className="lg:col-span-2 rounded-3xl shadow-xl p-6 backdrop-blur-md bg-white/40 dark:bg-gray-900/50">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={<Mail className="w-5 h-5 text-orange-500" />}
              label="Email"
              value={user.email}
              link={`mailto:${user.email}`}
            />
            <InfoCard
              icon={<Phone className="w-5 h-5 text-green-500" />}
              label="Phone"
              value={formData.phone || "+880170000000"}
              editable={editing}
              name="phoneNumber"
              onChange={handleChange}
            />
            <InfoCard
              icon={<MapPin className="w-5 h-5 text-blue-500" />}
              label="Location"
              value={formData.location || "Dhaka, Bangladesh"}
              editable={editing}
              name="location"
              onChange={handleChange}
            />
          </div>
        </div>
      </motion.div>

      {/* ================= FOOD ADVERTISEMENT SECTION ================= */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* BIG FOOD AD */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-6 md:mb-0">
              <span className="badge badge-warning mb-3">🔥 Hot Deal</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Delicious Food
              </h2>
              <p className="text-sm md:text-base opacity-90 max-w-md mb-6">
                Order your favorite meals from top restaurants. Fast delivery,
                best taste🍽️
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="btn bg-white text-red-600 hover:bg-gray-100">
                  🍔 Order Now
                </button>
                <Link
                  to="/all-menu"
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600"
                >
                  🍕 Explore Menu
                </Link>
              </div>
            </div>

            <div className="shrink-0">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="food"
                className="w-full md:w-70 max-w-full opacity-90"
              />
            </div>
          </div>
        </div>

        {/* SIDE OFFER CARD */}
        <div className="rounded-3xl p-6 bg-base-100 dark:bg-gray-900 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-bold mb-2 dark:text-white">
              🎁 Combo Offer
            </h4>
            <p className="text-sm opacity-80 mb-4 dark:text-gray-300">
              Buy 1 Get 1 free on selected food items.
            </p>
          </div>

          <button className="btn btn-primary btn-sm">Grab Offer</button>
        </div>
      </motion.div>
    </div>
  );
};

/* ================= REUSABLE INFO CARD ================= */
const InfoCard = ({ icon, label, value, link, editable, name, onChange }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-200 dark:bg-gray-800">
      {icon}
      <div className="flex-1">
        <p className="text-xs opacity-70 dark:text-gray-300">{label}</p>
        {editable ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
          />
        ) : link ? (
          <a
            href={link}
            className="text-sm font-medium dark:text-white hover:text-orange-500 transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium dark:text-white">{value}</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
