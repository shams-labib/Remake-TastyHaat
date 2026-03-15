import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Context/useAuth/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../../Loader/Loader";

const MySwal = withReactContent(Swal);

const Login = () => {
  const { googleLogin, signInEmail, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loader></Loader>;
  }

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        MySwal.fire({
          title: <p>🎉 Logged in with Google!</p>,
          icon: "success",
          background: "#fff5e6",
          color: "#ff4d4d",
          confirmButtonColor: "#ff4d4d",
          customClass: { popup: "rounded-3xl shadow-lg" },
        });
        navigate("/"); // redirect after login
      })
      .catch((err) => {
        MySwal.fire({
          title: <p>⚠️ Login Failed</p>,
          text: err.message,
          icon: "error",
          background: "#fff5e6",
          color: "#ff4d4d",
          confirmButtonColor: "#ff4d4d",
          customClass: { popup: "rounded-3xl shadow-lg" },
        });
      });
  };

  const onSubmit = (data) => {
    const { email, password } = data;

    signInEmail(email, password)
      .then((res) => {
        MySwal.fire({
          title: <p>🍔 Welcome Back!</p>,
          text: "You have successfully logged in",
          icon: "success",
          background: "#fff5e6",
          color: "#ff4d4d",
          confirmButtonColor: "#ff4d4d",
          customClass: { popup: "rounded-3xl shadow-lg" },
        });
        navigate("/"); // redirect after login
      })
      .catch((err) => {
        MySwal.fire({
          title: <p>⚠️ Login Failed</p>,
          text: err.message,
          icon: "error",
          background: "#fff5e6",
          color: "#ff4d4d",
          confirmButtonColor: "#ff4d4d",
          customClass: { popup: "rounded-3xl shadow-lg" },
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 dark:border-gray-700/40">
        <h2 className="text-3xl font-extrabold text-center mb-8 dark:text-white">
          Welcome Back to <span className="text-red-600">TastyHaat</span>
        </h2>

        {/* ================= LOGIN FORM ================= */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg hover:from-red-600 hover:to-orange-600 shadow-lg transform hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* ================= DIVIDER ================= */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-3 text-gray-500 dark:text-gray-400 font-semibold">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* ================= SOCIAL LOGIN ================= */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <FaGoogle /> Google
          </button>

          <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <FaFacebook /> Facebook
          </button>
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-red-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
