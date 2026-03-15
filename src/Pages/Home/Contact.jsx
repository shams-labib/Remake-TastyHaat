import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
      <div className="container mx-auto grid gap-8 lg:grid-cols-2 md:px-8">
        <motion.div
          className="relative p-8 sm:p-10 bg-gray-800/70 dark:bg-gray-700/80 text-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="absolute w-28 h-28 bg-white/10 rounded-full -top-10 -left-10 animate-bounce-slow"></div>
          <div className="absolute w-28 h-28 bg-white/10 rounded-full -bottom-10 -right-10 animate-bounce-slow-reverse"></div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Talk</h2>
          <p className="mb-6 sm:mb-8 text-white/70 leading-relaxed">
            Questions? Feedback? Or just want to say hi? Reach out and we'll get
            back to you in no time.
          </p>

          <div className="space-y-4 text-base sm:text-lg mb-6">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-white text-lg sm:text-xl" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-white text-lg sm:text-xl" />
              <span>info@restaurant.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-white text-lg sm:text-xl" />
              <span>123 Food Street, Gourmet City</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center gap-2">
              <FaClock /> Opening Hours
            </h3>
            <ul className="space-y-1 text-sm sm:text-base text-white/80">
              <li>Monday - Friday: 10:00 AM - 10:00 PM</li>
              <li>Saturday: 10:00 AM - 11:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          className="relative p-8 sm:p-10 bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">
            Send a Message
          </h2>
          <form className="space-y-4 sm:space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none h-32 resize-none transition"
            ></textarea>
            <motion.button
              type="submit"
              className="w-full py-3 sm:py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Tailwind Custom Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }

        @keyframes bounce-slow-reverse {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow-reverse { animation: bounce-slow-reverse 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Contact;
