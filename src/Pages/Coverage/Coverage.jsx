import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaSearchLocation,
} from "react-icons/fa";
import { motion } from "framer-motion";

const entryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Coverage = ({ coverageData = [] }) => {
  const position = [23.8103, 90.4125];
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    const district = coverageData.find((c) =>
      c.district.toLowerCase().includes(value.toLowerCase()),
    );
    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 12, {
        duration: 1.5,
      });
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      {/* Tailwind কাস্টম কন্টেইনার ব্যবহার করা হয়েছে */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={entryVariants}
        className="container mx-auto px-4"
      >
        {/* --- Header Area --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs">
              <span className="w-8 h-[2px] bg-orange-600"></span>
              <FaGlobeAmericas /> Our Network
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Serving Across <span className="text-orange-600">Bangladesh</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
              From Dhaka to Tetulia, we deliver your favorite food to your
              doorstep. Find our {coverageData.length || 64} service points on
              the map.
            </p>
          </div>

          {/* Search Bar - Header এর পাশে বসানো হয়েছে (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 w-full md:max-w-sm transition-all focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:shadow-xl focus-within:ring-1 ring-orange-500/50"
          >
            <div className="flex-1 flex items-center px-4">
              <FaSearchLocation className="text-gray-400 mr-2" />
              <input
                type="search"
                name="search"
                placeholder="Find your district..."
                className="w-full bg-transparent outline-none py-2 text-sm text-gray-800 dark:text-gray-100"
              />
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all">
              Locate
            </button>
          </form>
        </div>

        {/* --- Map Frame --- */}
        <div className="relative group">
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
            <MapContainer
              center={position}
              ref={mapRef}
              zoom={7}
              scrollWheelZoom={false}
              className="w-full h-full z-0"
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

              {coverageData.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup className="custom-popup">
                    <div className="p-3 min-w-[160px]">
                      <h4 className="font-bold text-gray-900 mb-1">
                        {center.district}
                      </h4>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        <p className="mb-2 font-medium">Available Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {center.covered_area.slice(0, 4).map((area, i) => (
                            <span
                              key={i}
                              className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 px-1.5 py-0.5 rounded italic"
                            >
                              #{area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Float Info Card */}
            <div className="absolute top-6 right-6 z-[500] hidden sm:block">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="user"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-800 dark:text-white">
                      Active Delivery
                    </p>
                    <p className="text-green-500 font-medium">
                      1.2k+ users today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; }
        .custom-popup .leaflet-popup-content { margin: 0; }
        .leaflet-container { font-family: inherit; }
      `}</style>
    </section>
  );
};

export default Coverage;
