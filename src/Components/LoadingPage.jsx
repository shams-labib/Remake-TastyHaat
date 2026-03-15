import { motion } from "framer-motion";
import { UtensilsCrossed, Sparkles } from "lucide-react";

const LoadingPage = () => {
  const brandName = "TastyHaat";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-base-100 overflow-hidden">
      {/* 1. Animated Background Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] -z-10"
      />

      {/* 2. Main Icon Section */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-6 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl shadow-orange-500/10 border border-orange-500/10"
        >
          <UtensilsCrossed size={56} className="text-orange-500" />

          {/* Sparkle accents */}
          <motion.div
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-2 -right-2 text-yellow-400"
          >
            <Sparkles size={20} fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Dynamic Shadow with Perspective */}
        <motion.div
          animate={{
            scale: [1, 0.7, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/40 rounded-[100%] blur-md"
        />
      </div>

      {/* 3. Staggered Brand Text Animation */}
      <div className="text-center space-y-4">
        <div className="flex text-4xl md:text-5xl font-black tracking-tight">
          {brandName.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.05,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3,
              }}
              className={index < 5 ? "text-orange-500" : "text-base-content"}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* 4. Elegant Minimalist Loading Bar */}
        <div className="w-48 h-1 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-base-content/40"
        >
          Preparing your table
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage;
