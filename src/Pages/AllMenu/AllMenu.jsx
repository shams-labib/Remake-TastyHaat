import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Search, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Loader from "../Loader/Loader";

const ITEMS_PER_PAGE = 12;

const AllMenu = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUrl = `${import.meta.env.VITE_API_URL}/menus`;
    setIsLoading(true);

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading menu:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredMenus = useMemo(() => {
    let data = [...menus];
    if (searchTerm) {
      data = data.filter((menu) =>
        menu.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (sortOrder === "low") data.sort((a, b) => a.price - b.price);
    if (sortOrder === "high") data.sort((a, b) => b.price - a.price);
    return data;
  }, [menus, searchTerm, sortOrder]);

  const totalPages = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);
  const paginatedMenus = filteredMenus.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-100 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* HEADER SECTION */}
        <div className="py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
          >
            Our Delicious <span className="text-primary">Menu</span>
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Discover our wide range of handcrafted dishes made with fresh
            ingredients.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center">
          <div className="relative w-full md:flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="What are you craving today?"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm dark:text-white"
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-64 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:border-primary shadow-sm dark:text-white appearance-none cursor-pointer"
          >
            <option value="">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* MENU GRID: 2 Column Mobile, 4 Column Desktop */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {paginatedMenus.length > 0 ? (
              paginatedMenus.map((menu, index) => (
                <motion.div
                  layout
                  key={menu._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  {/* IMAGE - Fixed Ratio */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] md:text-sm font-bold">
                      ${menu.price}
                    </div>
                  </div>

                  {/* CONTENT - Uniform Height */}
                  <div className="p-3 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                      {menu.name}
                    </h3>
                    <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-grow italic">
                      {menu.description}
                    </p>

                    <Link
                      to={`/all-menu/${menu._id}`}
                      className="w-full py-2 md:py-3 bg-primary text-white rounded-xl text-[11px] md:text-sm font-black flex items-center justify-center gap-2 hover:bg-secondary active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                      <span className="hidden xs:inline">Details</span>{" "}
                      <ShoppingCart size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-400 text-lg italic">
                  No menu items match your search.
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 dark:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white hover:border-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 dark:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMenu;
