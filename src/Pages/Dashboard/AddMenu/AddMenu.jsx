import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../Context/useAuth/useAuth";
import useAxiosSecure from "../../../Context/useaxios/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loader from "./../../Loader/Loader";

const AddMenu = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "User not authenticated",
      });
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      postedBy: user.email,
    };

    try {
      const res = await axiosSecure.post("/menus", payload);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed to save menu");
      }

      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
        isAvailable: true,
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Menu added successfully",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard/my-menus");
      });
    } catch (error) {
      console.error("Add menu error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="container mx-auto min-h-screen px-4 sm:px-6 py-6
                   dark:bg-gray-900 transition-colors"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8
                 text-gray-900 dark:text-white"
      >
        Add <span className="text-primary">Menu</span>
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-5 sm:p-6 rounded-2xl shadow-lg
                 bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Menu Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Chicken Burger"
              className="w-full rounded-lg border px-4 py-2
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-primary/40
                       focus:border-primary transition"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Price
            </label>
            <input
              type="number"
              name="price"
              required
              placeholder="350"
              className="w-full rounded-lg border px-4 py-2
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-primary/40
                       focus:border-primary transition"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://image.com/menu.jpg"
              className="w-full rounded-lg border px-4 py-2
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-primary/40
                       focus:border-primary transition"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Short description of the menu"
              className="w-full rounded-lg border px-4 py-2 min-h-25
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-600
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-primary/40
                       focus:border-primary transition"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <label
            className="flex items-center gap-3 cursor-pointer
                          text-gray-800 dark:text-gray-200"
          >
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-5 w-5 accent-primary"
            />
            <span className="font-medium">Available</span>
          </label>

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white
                     bg-primary hover:bg-primary/90
                     disabled:opacity-70 disabled:cursor-not-allowed
                     transition"
          >
            {loading ? "Saving..." : "Add Menu"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddMenu;
