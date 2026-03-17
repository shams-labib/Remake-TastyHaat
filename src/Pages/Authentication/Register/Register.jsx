import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Context/useAuth/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../../Loader/Loader";
import useAxiosSecure from "../../../Context/useaxios/useAxiosSecure";

const MySwal = withReactContent(Swal);

const showAlert = (title, text, icon) => {
  MySwal.fire({
    title,
    text,
    icon,
    background: "#fff5e6",
    color: "#ff4d4d",
    confirmButtonColor: "#ff4d4d",
    customClass: { popup: "rounded-3xl shadow-lg" },
  });
};

const Register = () => {
  const navigate = useNavigate();
  const { googleLogin, registerEmail, updateUserProfile, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <Loader />;

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      showAlert("🎉 Logged in with Google!", "", "success");
      navigate("/");
    } catch (err) {
      showAlert("⚠️ Login Failed", err.message, "error");
    }
  };

  // --- Facebook Deactivation Modal ---
  const handleFacebookLogin = () => {
    showAlert(
      "Facebook Login",
      "Facebook user mood now is deactivated, please use Google login.",
      "info",
    );
  };

  const onSubmit = async (data) => {
    const { name, email, password, phone, location, photo } = data;

    try {
      if (!photo || photo.length === 0) {
        throw new Error("Please select a profile picture");
      }
      const formData = new FormData();
      formData.append("image", photo[0]);
      const imgbbKey = import.meta.env.VITE_IMAGE_HOST_KEY;
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        { method: "POST", body: formData },
      );

      const imgData = await imgbbRes.json();
      if (!imgData.success) throw new Error("Image upload failed");
      const photoURL = imgData.data.url;

      await registerEmail(email, password);
      await updateUserProfile({ displayName: name, photoURL });

      const userData = { name, email, phone, location, photoURL, role: "user" };

      try {
        await axiosSecure.post("/users", userData);
        showAlert(
          `🍔 Welcome ${name}!`,
          "Your account has been created!",
          "success",
        );
        navigate("/");
      } catch (err) {
        if (err.response?.status === 409) {
          showAlert("⚠️ Registration Failed", "User already exists", "error");
        } else {
          showAlert("⚠️ Registration Failed", err.message, "error");
        }
      }
    } catch (err) {
      showAlert("⚠️ Registration Failed", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md my-10 bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 dark:border-gray-700/40">
        <h2 className="text-3xl font-extrabold text-center mb-8 dark:text-white">
          Join <span className="text-primary">TastyHaat</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* ... Inputs (Name, Email, Photo, Phone, Location, Password) ... */}
          {/* Note: I'm keeping your input structure as it is */}

          <input
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary transition duration-300"
          />
          {errors.name && (
            <p className="text-primary text-xs">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary transition duration-300"
          />
          {errors.email && (
            <p className="text-primary text-xs">{errors.email.message}</p>
          )}

          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Profile picture is required" })}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary transition duration-300"
          />
          {errors.photo && (
            <p className="text-primary text-xs">{errors.photo.message}</p>
          )}

          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary transition duration-300"
          />
          {errors.phone && (
            <p className="text-primary text-xs">{errors.phone.message}</p>
          )}

          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: "Location is required" })}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary transition duration-300"
          />
          {errors.location && (
            <p className="text-primary text-xs">{errors.location.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "6+ chars" },
            })}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary transition duration-300"
          />
          {errors.password && (
            <p className="text-primary text-xs">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="py-4 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <FaGoogle /> Google
          </button>

          <button
            type="button"
            onClick={handleFacebookLogin} // <--- এখানে ক্লিক করলে মোডাল আসবে
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <FaFacebook /> Facebook
          </button>
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
