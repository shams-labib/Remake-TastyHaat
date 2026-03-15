import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Star, Heart } from "lucide-react";
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="menu" className="container mx-auto px-4">
      <div className="bg-base-100 dark:bg-gray-800 py-16 md:px-5">
        {/* SECTION HEADER */}
        <h1 className="text-3xl md:text-4xl dark:text-white font-bold text-center mb-12">
          Popular <span className="text-primary">Menu</span>
        </h1>

        {/* GRID: 2 Columns Mobile, 4 Columns Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {menus.slice(0, 4).map((menu) => (
            <div
              key={menu._id}
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* IMAGE SECTION - Square height for mobile */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover"
                />

                {/* Price Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-primary text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
                    ${menu.price}
                  </span>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <h2 className="text-sm md:text-lg font-bold mb-1 dark:text-white line-clamp-1">
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

                {/* Fixed line height description */}
                <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-sm mb-4 line-clamp-2 flex-grow">
                  {menu.description || "Fresh and delicious food served hot."}
                </p>

                {/* ACTION BUTTON */}
                <div className="mt-auto">
                  <Link
                    to={`/all-menu/${menu._id}`}
                    className="inline-flex items-center justify-center w-full gap-2 py-2 md:py-3 bg-primary text-white text-[11px] md:text-sm font-bold rounded-lg hover:bg-secondary transition-all active:scale-95"
                  >
                    Details <ShoppingCart size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCards;
