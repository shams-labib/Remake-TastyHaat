import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import { Link } from "react-router";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Coffee, Pizza } from "lucide-react";

const MenuCards = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchUrl = `${import.meta.env.VITE_API_URL}/menus`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Error loading menu:", err));
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [menus]);

  return (
    <div id="menu" className="container mx-auto px-4">
      <div className="bg-base-100 dark:bg-gray-800 py-16 md:px-5">
        <h1
          data-aos="fade-up"
          className="text-4xl dark:text-white font-bold text-center mb-12 relative w-full"
        >
          {/* Floating Star above */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Star size={24} />
          </motion.div>

          {/* Floating Coffee icon top-left */}
          <motion.div
            className="absolute -top-4 left-1/3 text-primary"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <Coffee size={24} />
          </motion.div>

          {/* Floating Pizza icon bottom-right */}
          <motion.div
            className="absolute -bottom-6 right-1/3 text-primary"
            animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Pizza size={24} />
          </motion.div>

          <span className="relative z-10 inline-block">
            Popular <span className="text-primary">Menu</span>
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menus.slice(0, 4).map((menu, index) => (
            <motion.div
              key={menu._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-44 object-cover rounded-t-2xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Animated Price Tag */}
                <motion.span
                  className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  ${menu.price}
                </motion.span>

                {/* Animated Favorite Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="absolute top-3 left-3 text-red-500 cursor-pointer"
                >
                  <Heart size={20} />
                </motion.div>
              </div>

              <div className="p-5 flex flex-col justify-between h-55">
                <div>
                  <h2 className="text-lg font-semibold mb-2 dark:text-white">
                    {menu.name}
                  </h2>

                  <div className="flex items-center gap-2 mb-3">
                    {/* Animated Stars */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2 + i * 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <Star className="text-primary" size={16} />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4">
                    {menu.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <Link
                    to={`/all-menu/${menu._id}`}
                    className="btn bg-primary hover:bg-secondary rounded-lg font-semibold transition-colors duration-300 text-white flex items-center shadow-none gap-2 px-4 py-2"
                  >
                    View Details <ShoppingCart size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCards;
