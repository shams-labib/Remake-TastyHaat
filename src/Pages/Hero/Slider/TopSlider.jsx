import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";
import { motion } from "framer-motion";

const sliderImages = [
  {
    img: "https://i.ibb.co/ZpwLvz6X/360-F-187860162-h-WCup6-TWAb-Kw-Oz-S3s-Kxkn2-ZDZm-Gx-ZA47.jpg",
    title: "Delicious Food",
    subtitle: "Get your favorite meals delivered fast",
  },
  {
    img: "https://i.ibb.co/nMk9JXF7/image.png",
    title: "Fast Delivery",
    subtitle: "We reach your door in minutes",
  },
  {
    img: "https://i.ibb.co/tw4NK5LF/image.png",
    title: "Fresh & Hot",
    subtitle: "Your order comes with love ❤️",
  },
];

const TopSlider = () => {
  // Optional: useEffect if you want to integrate other stuff
  useEffect(() => {}, []);

  return (
    <div className="container mx-auto my-10">
      <div className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          speed={1000}
          className="w-full h-full"
        >
          {sliderImages.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-full relative group overflow-hidden">
                {/* Background Image with motion */}
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-center items-center text-center text-white px-6">
                  {/* Title */}
                  <motion.h2
                    className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-xl uppercase tracking-wide"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    {item.title}
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    className="text-lg md:text-xl mb-5 font-medium drop-shadow-md"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  >
                    {item.subtitle}
                  </motion.p>

                  {/* Button */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <Link
                      to="/all-menu"
                      className="relative inline-block px-8 py-3 font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:brightness-110"
                    >
                      <span className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full"></span>
                      Order Now
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSlider;
