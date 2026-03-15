import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error loading menu:", err));
  }, []);

  return (
    <div id="menu" className="container mx-auto py-16">
      <div className="px-5">
        <h1
          data-aos="fade-up"
          className="text-4xl dark:text-white font-bold text-center mb-12"
        >
          Our <span className="text-primary">Menu</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menu.map((item, index) => (
            <motion.div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "tween", duration: 0.15 }}
              className="
                w-full
                bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg
                rounded-2xl
                shadow-xl border border-gray-200 dark:border-gray-700
                overflow-hidden
                cursor-pointer
                transition-all duration-300
              "
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Price badge */}
                <span
                  className="
                    absolute top-3 right-3
                    bg-primary text-white
                    text-xs font-semibold
                    px-3 py-1 rounded-full
                    shadow-md
                  "
                >
                  ৳{item.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2 dark:text-white">
                  {item.name}
                </h2>

                <p className="text-gray-700 dark:text-gray-200 line-clamp-2 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Divider */}
                <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600 mb-4 opacity-60" />

                {/* Action */}
                <button
                  onClick={() => item.isAvailable && navigate(`/all-menu/${item.id}`)}
                  disabled={!item.isAvailable}
                  className={`w-full btn rounded-lg font-semibold transition-colors duration-300
    ${item.isAvailable
                      ? "bg-primary hover:bg-secondary"
                      : "bg-gray-400 cursor-not-allowed"
                    }
    dark:text-white
  `}
                >
                  {item.isAvailable ? "Order Now" : "Unavailable"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
