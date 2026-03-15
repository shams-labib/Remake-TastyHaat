import { useState, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineChevronUp } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const FloatingActionButtons = () => {
  const [showScroll, setShowScroll] = useState(false);

  const phoneNumber = "+880123456789"; // Apnar number din
  const whatsappNumber = "8801784768887"; // Apnar WhatsApp number
  const message = "Hello! I have a query.";

  // Scroll detection logic
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
      {/* 1. Scroll To Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="p-3 bg-white dark:bg-gray-800 text-primary border border-gray-200 dark:border-gray-700 shadow-xl rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <HiOutlineChevronUp
              size={24}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. WhatsApp Button */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-green-500/40 transition-shadow overflow-visible"
      >
        <FaWhatsapp size={30} />
        {/* Decorative Ring Effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
      </motion.a>

      {/* 3. Phone Button */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`tel:${phoneNumber}`}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-blue-600/40 transition-shadow"
      >
        <FaPhoneAlt size={22} />
      </motion.a>
    </div>
  );
};

export default FloatingActionButtons;
