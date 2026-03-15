import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import { Link } from "react-router";

const ITEMS_PER_PAGE = 12;

const AllMenu = () => {
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const filteredMenus = useMemo(() => {
    let data = [...menus];

    if (searchTerm) {
      data = data.filter((menu) =>
        menu.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [menus, searchTerm, sortOrder]);

  const totalPages = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);

  const paginatedMenus = filteredMenus.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-base-100 dark:bg-gray-800 py-16 px-5">
        <h1
          data-aos="fade-up"
          className="text-4xl dark:text-white font-bold text-center mb-12"
        >
          All <span className="text-primary">Menu</span>
        </h1>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          data-aos="fade-up"
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10"
        >
          <div className="flex w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
        w-full px-4 py-3 rounded-l-lg
        bg-base-100 dark:bg-gray-800
        border border-base-300 dark:border-gray-700
        text-base-content dark:text-gray-100
        placeholder:text-base-content/60 dark:placeholder:text-gray-400
        outline-none focus:outline-none
        focus:border-primary dark:focus:border-primary
        transition-all
      "
            />
            <button
              type="submit"
              className="
        px-6 py-3 rounded-r-lg font-semibold
        bg-primary text-white
        hover:bg-secondary
        transition
      "
            >
              Search
            </button>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="
      w-full md:w-56 px-4 py-3 rounded-lg
      bg-base-100 dark:bg-gray-800
      border border-base-300 dark:border-gray-700
      text-base-content dark:text-gray-100
      outline-none focus:outline-none
      focus:border-primary dark:focus:border-primary
      transition-all
    "
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedMenus.length > 0 ? (
            paginatedMenus.map((menu, index) => (
              <motion.div
                key={menu._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "tween", duration: 0.15 }}
                className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-44 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <span
                    className="
                  absolute top-3 right-3
                  bg-primary text-white
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                  shadow-md
                "
                  >
                    ${menu.price}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold mb-2 dark:text-white">
                    {menu.name}
                  </h2>

                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4">
                    {menu.description}
                  </p>

                  <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600 mb-4 opacity-60"></div>

                  <Link
                    to={`/all-menu/${menu._id}`}
                    className="w-full btn bg-primary hover:bg-secondary rounded-lg font-semibold transition-colors duration-300 text-white"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-300 text-lg py-10">
              {searchTerm
                ? `No results found for "${searchTerm}"`
                : "No menu items found."}
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12 flex-wrap">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    px-4 py-2 rounded-lg font-semibold
                    transition
                    ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-primary hover:text-white"
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMenu;
