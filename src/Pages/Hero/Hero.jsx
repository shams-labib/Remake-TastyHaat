import React from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Utensils, Star, Clock } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Hero = () => {
  // --- Modal function ---
  const handleFindFood = () => {
    MySwal.fire({
      title: <p className="font-bold">Notice</p>,
      text: "More food adding, now find food in All Menu section.",
      icon: "info",
      background: "#fff5e6",
      color: "#ff4d4d",
      confirmButtonColor: "#ff4d4d",
      customClass: { popup: "rounded-3xl shadow-lg" },
      showClass: {
        popup: "animate__animated animate__fadeInUp", // মোডাল নিচ থেকে ওপরে ওঠার জন্য
      },
    });
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-800 py-12 lg:py-24 px-4 transition-colors duration-500">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* --- LEFT CONTENT --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold mb-4 border border-orange-200/50 dark:border-orange-500/20">
                <Utensils size={14} className="animate-bounce" />
                24/7 Premium Delivery
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                <span className="text-orange-600">Fast, Fresh</span>
                <br />& Right To Your{" "}
                <span className="relative inline-block">
                  Door
                  <motion.svg
                    viewBox="0 0 100 20"
                    className="absolute -bottom-1 left-0 w-full h-3 text-orange-500/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <path
                      d="M5 15 Q 50 5 95 15"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-slate-600 dark:text-gray-300 text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Craving something delicious? Order from the best local restaurants
              and get it delivered in{" "}
              <span className="text-orange-600 dark:text-orange-400 font-semibold">
                under 30 minutes.
              </span>
            </motion.p>

            {/* SEARCH BAR */}
            <motion.div
              variants={itemVariants}
              className="relative max-w-xl mx-auto lg:mx-0 group"
            >
              <div className="flex flex-col sm:flex-row items-center p-2 bg-white dark:bg-gray-700 rounded-2xl sm:rounded-full shadow-xl shadow-black/5 border border-slate-200 dark:border-gray-600 transition-all duration-300 group-focus-within:ring-2 ring-orange-500/20">
                <div className="flex items-center flex-1 w-full px-4 gap-3 py-3 sm:py-0">
                  <MapPin className="text-orange-500" size={22} />
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="w-full bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-gray-400 font-medium text-sm md:text-base"
                  />
                </div>
                {/* বাটনে ফাংশনটি যোগ করা হয়েছে */}
                <button
                  onClick={handleFindFood}
                  className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl sm:rounded-full transition-all duration-300 shadow-lg shadow-orange-600/30 active:scale-95 flex items-center justify-center gap-2 overflow-hidden relative"
                >
                  <Search size={18} />
                  <span>Find Food</span>
                </button>
              </div>
            </motion.div>

            {/* TRUST INDICATORS */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-slate-200 overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="user"
                    />
                  </div>
                ))}
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-gray-700" />
              <div>
                <div className="flex items-center gap-1">
                  <Star className="fill-orange-500 text-orange-500" size={16} />
                  <span className="font-bold text-slate-900 dark:text-white">
                    4.9/5
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                  100k+ Happy Customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT IMAGE CONTENT --- */}
          <div className="flex-1 relative w-full max-w-[550px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="relative z-10 drop-shadow-[0_35px_35px_rgba(255,96,0,0.15)]"
              >
                <img
                  src="https://i.ibb.co.com/twt2tWcr/image.png"
                  alt="Food Bowl"
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* Delivery Card */}
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-10 -right-4 md:right-0 bg-white dark:bg-gray-700 p-3 md:p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3 border border-slate-100 dark:border-gray-600"
              >
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-xl">
                  <Clock
                    className="text-green-600 dark:text-green-400"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400 font-bold">
                    Delivery
                  </p>
                  <p className="font-black text-slate-900 dark:text-white text-sm">
                    30 Mins
                  </p>
                </div>
              </motion.div>

              {/* Rating Card */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: 1,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-4 md:left-0 bg-white dark:bg-gray-700 p-3 md:p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3 border border-slate-100 dark:border-gray-600"
              >
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                  <Star
                    className="text-orange-600 dark:text-orange-400"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400 font-bold">
                    Review
                  </p>
                  <p className="font-black text-slate-900 dark:text-white text-sm">
                    4.8 (5k+)
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
