import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion"; // Animation er jonno
import Loader from "../Loader/Loader";

const MenuCards = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = `${import.meta.env.VITE_API_URL}/menus`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading menu:", err);
        setLoading(false);
      });
  }, []);

  // Animation variants definition
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Ekta card ashar kisu khon por arekta asbe
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="menu" className="container mx-auto px-4 overflow-hidden">
      <div className="bg-base-100 dark:bg-gray-800 py-12 md:py-16">
        {/* SECTION HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl dark:text-white font-bold text-center mb-10 md:mb-12"
        >
          Popular <span className="text-primary">Menu</span>
        </motion.h1>

        {/* GRID: 2 Columns Mobile, 4 Columns Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {menus.slice(0, 4).map((menu) => (
            <motion.div
              key={menu._id}
              variants={cardVariants}
              whileHover={{ y: -8 }} // Desktop e hover effect
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden h-full transition-shadow duration-300"
              style={{ willChange: "transform" }} // GPU acceleration
            >
              {/* IMAGE SECTION */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Price Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ${menu.price}
                  </span>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <h2 className="text-sm md:text-lg font-bold mb-1 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                  {menu.name}
                </h2>

                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
                  {menu.description || "Fresh and delicious food served hot."}
                </p>

                {/* ACTION BUTTON */}
                <div className="mt-auto">
                  <Link
                    to={`/all-menu/${menu._id}`}
                    className="inline-flex items-center justify-center w-full gap-2 py-2.5 md:py-3 bg-primary text-white text-[11px] md:text-sm font-bold rounded-xl hover:bg-secondary transition-all active:scale-95 shadow-md hover:shadow-primary/20"
                  >
                    Details <ShoppingCart size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuCards;
