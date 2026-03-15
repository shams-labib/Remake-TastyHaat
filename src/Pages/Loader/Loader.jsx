// SimpleCircleLoader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-12 h-12 border-4 border-b-transparent border-purple-500 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 0.9,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-8 h-8 border-4 border-r-transparent border-pink-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.7,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
