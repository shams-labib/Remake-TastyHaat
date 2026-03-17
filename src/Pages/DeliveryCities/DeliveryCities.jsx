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
    <section className="bg-white dark:bg-gray-900 py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10 text-left">
          We deliver to:
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md"
            >
              {/* Image Container */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Text Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold leading-tight">{city.name}</h3>
                <p className="text-sm opacity-90">
                  {city.restaurants} Restaurants
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryCities;
