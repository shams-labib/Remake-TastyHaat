import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const sliderImages = [
  {
    img: "https://i.ibb.co/ZpwLvz6X/360-F-187860162-h-WCup6-TWAb-Kw-Oz-S3s-Kxkn2-ZDZm-Gx-ZA47.jpg",
    title: "Delicious Food",
    subtitle: "Get your favorite meals delivered fast",
    highlight: "Delicious",
  },
  {
    img: "https://i.ibb.co/nMk9JXF7/image.png",
    title: "Fast Delivery",
    subtitle: "We reach your door in minutes",
    highlight: "Fast",
  },
  {
    img: "https://i.ibb.co/tw4NK5LF/image.png",
    title: "Fresh & Hot",
    subtitle: "Your order comes with love ❤️",
    highlight: "Fresh",
  },
];

const TopSlider = () => {
  return (
    <section className="container mx-auto my-10 px-4">
      <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden rounded-[2rem] shadow-2xl group">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade" // Added fade effect for a more premium feel
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          speed={1000}
          className="w-full h-full"
        >
          {sliderImages.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div className="w-full h-full relative">
                  {/* Background Image with Ken Burns Effect */}
                  <motion.div
                    initial={{ scale: 1.2 }}
                    animate={isActive ? { scale: 1 } : { scale: 1.2 }}
                    transition={{ duration: 5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center items-start text-left text-white px-8 md:px-20">
                    {/* Badge */}
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={isActive ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest mb-4"
                    >
                      Top Rated Service
                    </motion.span>

                    {/* Title */}
                    <motion.h2
                      className="text-4xl md:text-7xl font-black mb-4 leading-tight"
                      initial={{ y: 30, opacity: 0 }}
                      animate={isActive ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {item.title.split(" ")[0]}{" "}
                      <span className="text-primary">
                        {item.title.split(" ")[1]}
                      </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                      className="text-base md:text-xl mb-8 font-medium text-slate-200 max-w-md"
                      initial={{ y: 20, opacity: 0 }}
                      animate={isActive ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      {item.subtitle}
                    </motion.p>

                    {/* Action Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <Link
                        to="/all-menu"
                        className="group/btn relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-primary rounded-full hover:bg-secondary shadow-[0_10px_20px_-10px_rgba(255,96,0,0.5)] active:scale-95"
                      >
                        Order Now
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Style Overrides (Scoped to this component) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .swiper-pagination-bullet {
            background: white !important;
            opacity: 0.5;
            width: 10px;
            height: 10px;
          }
          .swiper-pagination-bullet-active {
            background: #ff6000 !important; /* Your primary color */
            opacity: 1;
            width: 30px;
            border-radius: 5px;
          }
        `,
          }}
        />
      </div>
    </section>
  );
};

export default TopSlider;
