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
    // overflow-hidden add kora hoyeche jate slide animation-er somoy scrollbar na ashe
    <section
      id="contact"
      className="bg-gray-50 dark:bg-gray-800 py-16 px-4 overflow-hidden"
    >
      <div className="container mx-auto grid gap-8 lg:grid-cols-2 md:px-8">
        {/* Left Card: Info */}
        <motion.div
          className="relative p-8 sm:p-10 bg-gray-800 dark:bg-gray-800 text-white rounded-3xl shadow-2xl overflow-hidden"
          // Mobile-e niche theke (y: 20) asbe, Desktop-e baam theke (x: -50) asbe
          initial={{ x: -50, y: 20, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Background Circles */}
          <div className="absolute w-28 h-28 bg-white/5 rounded-full -top-10 -left-10 animate-bounce-slow"></div>
          <div className="absolute w-28 h-28 bg-white/5 rounded-full -bottom-10 -right-10 animate-bounce-slow-reverse"></div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Talk</h2>
          <p className="mb-6 sm:mb-8 text-white/70 leading-relaxed">
            Questions? Feedback? Or just want to say hi? Reach out and we'll get
            back to you in no time.
          </p>

          <div className="space-y-4 text-base sm:text-lg mb-6">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary text-lg sm:text-xl" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary text-lg sm:text-xl" />
              <span>info@restaurant.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary text-lg sm:text-xl" />
              <span>123 Food Street, Gourmet City</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center gap-2">
              <FaClock className="text-primary" /> Opening Hours
            </h3>
            <ul className="space-y-1 text-sm sm:text-base text-white/80">
              <li>Monday - Friday: 10:00 AM - 10:00 PM</li>
              <li>Saturday: 10:00 AM - 11:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </motion.div>

        {/* Right Card: Contact Form */}
        <motion.div
          className="relative p-8 sm:p-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-2xl"
          // Mobile-e niche theke (y: 20) asbe, Desktop-e daan theke (x: 50) asbe
          initial={{ x: 50, y: 20, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">
            Send a Message
          </h2>
          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <textarea
              placeholder="Your Message"
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none h-32 resize-none transition-all"
            ></textarea>

            <motion.button
              type="submit"
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }

        @keyframes bounce-slow-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow-reverse { animation: bounce-slow-reverse 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Contact;
