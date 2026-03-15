import { motion } from "framer-motion";
import { UtensilsCrossed, Sparkles } from "lucide-react";

const LoadingPage = () => {
  const brandName = "TastyHaat";

  // GPU optimization er jonno will-change use kora hoyeche
  const hardwareAccelerated = { willChange: "transform, opacity" };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-base-100 overflow-hidden">
      {/* 1. Optimized Ambient Glow - Blur komanu hoyeche mobile er jonno */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-500/10 rounded-full blur-[80px] md:blur-[120px] -z-10"
        style={hardwareAccelerated}
      />

      {/* 2. Main Icon Section */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-6 bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-orange-500/10"
          style={hardwareAccelerated}
        >
          <UtensilsCrossed size={48} className="text-orange-500" />

          {/* Sparkle - Simplified animation */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 text-yellow-400"
          >
            <Sparkles size={18} fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Dynamic Shadow - Simplified properties */}
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-sm"
        />
      </div>

      {/* 3. Optimized Brand Text - Split loop mobile e hang kore, tai eke simple rakha hoyeche */}
      <div className="text-center space-y-5">
        <div className="flex text-4xl font-black tracking-tight">
          {brandName.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.05,
              }}
              className={index < 5 ? "text-orange-500" : "text-base-content"}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* 4. Smooth Loading Bar - Transform use kora hoyeche layout shift er poriborte */}
        <div className="w-40 h-1 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden mx-auto relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 w-full h-full bg-orange-500"
            style={hardwareAccelerated}
          />
        </div>

        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-base-content/40"
        >
          Preparing your table
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage;
