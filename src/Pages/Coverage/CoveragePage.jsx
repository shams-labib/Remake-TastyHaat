import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaSearch, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData } from "react-router";

const CoveragePage = () => {
  const position = [23.685, 90.3563]; // Central Bangladesh
  const rawData = useLoaderData();
  const serviceData = Array.isArray(rawData) ? rawData : [];
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = serviceData.filter((item) =>
    item.district.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const focusDistrict = (lat, lon) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], 12, { duration: 1.5 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* --- Header Section --- */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 py-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
          >
            <FaMapMarkerAlt /> Nationwide Delivery
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Our <span className="text-orange-600">Coverage</span> Area
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We are delivering happiness across {serviceData.length} districts in
            Bangladesh. Find your nearest service point below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
          {/* --- Left Sidebar: District List --- */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            {/* Search Box */}
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                type="text"
                placeholder="Search your district..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white dark:bg-gray-800 border-none shadow-lg rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white transition-all"
              />
            </div>

            {/* List Container */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-full overflow-y-auto p-4 space-y-3 custom-scrollbar">
                <AnimatePresence>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <motion.div
                        layout
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() =>
                          focusDistrict(item.latitude, item.longitude)
                        }
                        className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 cursor-pointer group transition-all"
                      >
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-orange-600">
                            {item.district}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {item.covered_area.join(", ")}
                          </p>
                        </div>
                        <FaChevronRight className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      No district found!
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- Right Side: Interactive Map --- */}
          <div className="lg:col-span-8 relative rounded-3xl shadow-2xl overflow-hidden border-8 border-white dark:border-gray-800 h-full">
            <MapContainer
              center={position}
              ref={mapRef}
              zoom={7}
              scrollWheelZoom={true}
              className="w-full h-full z-0"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceData.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h3 className="font-bold text-orange-600 text-base">
                        {center.district}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        <span className="font-semibold">Coverage:</span>
                        <br />
                        {center.covered_area.join(", ")}
                      </p>
                      <button className="mt-3 w-full bg-orange-600 text-white text-[10px] py-1.5 rounded-lg font-bold uppercase tracking-wider">
                        Order Now
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Overlay Badge */}
            <div className="absolute bottom-6 right-6 z-[1000] bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 hidden md:block">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tighter">
                Interactive Delivery Map v2.0
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 10px; }
        .leaflet-container { filter: grayscale(0.2) contrast(1.1); }
        .custom-popup .leaflet-popup-content-wrapper { border-radius: 15px; padding: 0; overflow: hidden; }
        .custom-popup .leaflet-popup-content { margin: 0; width: 180px !important; }
      `}</style>
    </div>
  );
};

export default CoveragePage;
