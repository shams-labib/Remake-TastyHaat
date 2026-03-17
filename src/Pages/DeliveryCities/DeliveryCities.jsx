import React from "react";
import { motion } from "framer-motion";

const cities = [
  {
    name: "Dhaka",
    restaurants: 3391,
    img: "https://i.ibb.co.com/9HzP0jkX/pexels-musaddek-sayek-2152825668-33859598.jpg",
  },
  {
    name: "Chattogram",
    restaurants: 389,
    img: "https://i.ibb.co.com/Wpcv77PM/chattagram.jpg",
  },
  {
    name: "Narayanganj",
    restaurants: 179,
    img: "https://i.ibb.co.com/4R78tmPz/chashara-narayanganj1.webp",
  },
  {
    name: "Khulna",
    restaurants: 157,
    img: "https://i.ibb.co.com/Xfz5DntB/original-2b71966470083829b059bad3b313f680.webp",
  },
  {
    name: "Sylhet",
    restaurants: 125,
    img: "https://i.ibb.co.com/pj4WyFLB/Sylhet-Title-Image-copy1.jpg",
  },
  {
    name: "Bogra",
    restaurants: 119,
    img: "https://i.ibb.co.com/KcnMxNWj/hq720.jpg",
  },
  {
    name: "Rajshahi",
    restaurants: 96,
    img: "https://i.ibb.co.com/chXxPmLK/image.jpg",
  },
  {
    name: "Cumilla",
    restaurants: 79,
    img: "https://i.ibb.co.com/przkdczm/maxresdefault.jpg",
  },
  {
    name: "Mymensingh",
    restaurants: 58,
    img: "https://i.ibb.co.com/Gvw8Q6Pq/maxresdefault.jpg",
  },
  {
    name: "Tangail",
    restaurants: 46,
    img: "https://i.ibb.co.com/9HSLr72Z/maxresdefault.jpg",
  },
  {
    name: "Gazipur",
    restaurants: 39,
    img: "https://i.ibb.co.com/5xsFTPR2/maxresdefault.jpg",
  },
  {
    name: "Cox's Bazar",
    restaurants: 30,
    img: "https://i.ibb.co.com/VcKg7yb1/111721741504795155686.jpg",
  },
];

const DeliveryCities = () => {
  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-4 transition-colors duration-300">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              We deliver to <span className="text-orange-600">your city</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Explore restaurants and stores in your neighborhood
            </p>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {cities.map((city, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="relative group cursor-pointer h-56 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              {/* Image with Dark Overlay */}
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Intelligent Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-orange-950/90 transition-colors duration-500"></div>

              {/* Text Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-xl font-black tracking-tight group-hover:text-orange-400 transition-colors">
                  {city.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <p className="text-[12px] font-medium opacity-80 uppercase tracking-wider">
                    {city.restaurants} options
                  </p>
                </div>
              </div>

              {/* Hover Badge (Optional) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryCities;
