import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Pizza, Coffee, X } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const topBurgers = [
  {
    name: "Rancho Burger",
    desc: "Kima with poached egg salad",
    price: "$14.00",
    img: "https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/4:3/w_2666,h_2000,c_limit/basically-burger-1.jpg",
  },
  {
    name: "Meat Smash Burger",
    desc: "2x Kima with egg salad",
    price: "$16.00",
    img: "https://www.marthastewart.com/thmb/O7vX-fTaCH0__IcKSCSdEc9KOxU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MS-911343-thick-burger-2x3-643ff8b571c148a5974166ba32f74e28.jpg",
  },
  {
    name: "Foodish's Burger",
    desc: "Thin Kima with tomato salad",
    price: "$19.00",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHp64n-eLrDSrY29_HCRIuP7-p89ndb18ezw&s",
  },
  {
    name: "Cheesy Delight",
    desc: "Cheese overloaded burger with fries",
    price: "$17.50",
    img: "https://www.recipetineats.com/tachyon/2023/09/Crispy-fried-chicken-burgers_5.jpg",
  },
  {
    name: "Smokey BBQ Burger",
    desc: "Grilled kima with BBQ sauce and lettuce",
    price: "$18.00",
    img: "https://i.ibb.co.com/Q7GgpVQG/photo-1613160775054-d4a634592b7f.avif",
  },
  {
    name: "Classic Beef Stack",
    desc: "Juicy beef patty with onion and special sauce",
    price: "$15.50",
    img: "https://i.ibb.co.com/bR1T5pCd/istockphoto-457520387-612x612.jpg",
  },
];

const TopSellerBurgers = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full  dark:bg-gray-800 py-20 px-4 transition-colors duration-300">
      <div className="container mx-auto relative">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 dark:text-white relative w-full">
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-orange-500"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Star size={32} fill="currentColor" />
          </motion.div>

          <motion.div
            className="absolute -top-4 left-[20%] text-amber-600 hidden md:block"
            animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <Coffee size={30} />
          </motion.div>

          <motion.div
            className="absolute -bottom-10 right-[20%] text-red-500 hidden md:block"
            animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Pizza size={32} />
          </motion.div>

          <span className="relative z-10">
            Top Seller{" "}
            <span className="text-orange-600 dark:text-orange-400">
              Burgers
            </span>
          </span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".custom-pagination-burgers",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {topBurgers.map((burger, i) => (
            <SwiperSlide key={i} className="py-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                // Removed all shadow classes here
                className="flex flex-col items-center text-center p-6 rounded-[2.5rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300"
              >
                <div className="relative w-44 h-44 mb-6">
                  <div className="absolute inset-0 bg-orange-100 dark:bg-orange-900/20 rounded-full scale-110 -z-0"></div>
                  {/* Removed shadow from image border */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700">
                    <img
                      src={burger.img}
                      alt={burger.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {burger.name}
                </h3>

                <div className="flex items-center gap-1 mb-3 justify-center">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 h-10 line-clamp-2 px-2 leading-tight">
                  {burger.desc}
                </p>

                <div className="flex flex-col items-center gap-3 w-full mt-auto">
                  <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                    {burger.price}
                  </span>

                  <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // Removed shadow-lg and shadow-orange-200 from button
                    className="w-full py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold transition-colors"
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination-burgers mt-10 flex justify-center"></div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl max-w-sm w-full text-center border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="text-orange-600" size={40} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Website Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Coming soon! Stay tuned for our ordering system.
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-3 bg-gray-900 dark:bg-orange-600 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                Got it!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-pagination-burgers .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #ea580c;
          opacity: 0.2;
        }
        .custom-pagination-burgers .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 5px;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TopSellerBurgers;
