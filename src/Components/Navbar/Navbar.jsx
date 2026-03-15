import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { Link, NavLink } from "react-router";
import Logo from "../shared/Logo/Logo";
import useAuth from "../../Context/useAuth/useAuth";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "All Menu", to: "/all-menu" },
  { name: "About", to: "/about-us" },
  { name: "Contact", to: "/contact-us" },
  { name: "Dashboard", to: "/dashboard" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, loading, signOutUser } = useAuth();

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary"
        : "text-gray-700 dark:text-gray-300 hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md transition-colors">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.to === "/dashboard" && !user) return null;
              return (
                <NavLink key={link.name} to={link.to} className={linkClass}>
                  {link.name}
                </NavLink>
              );
            })}

            {loading ? null : !user ? (
              <Link
                to="/login"
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Login Now
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 border
              border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/user.png"}
                    className="h-8 w-8 rounded-full object-cover"
                    alt="user"
                  />
                  <HiChevronDown className="text-gray-600 dark:text-gray-300" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-gray-900 shadow-xl">
                    <div className="px-4 py-3 border-b dark:border-gray-800">
                      <p className="text-sm text-gray-900 dark:text-base-200 font-semibold">
                        {user?.displayName || "User"}
                      </p>
                    </div>

                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-gray-900 dark:text-base-200 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={signOutUser}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-4 flex flex-col gap-2 transition-all duration-300">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg bg-[#E63946] px-3 py-2 text-center text-sm font-semibold text-white hover:bg-[#D62839] transition"
              >
                Login Now
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Profile
                </Link>

                <button
                  onClick={signOutUser}
                  className="rounded-lg px-3 py-2 text-sm text-red-600 text-left hover:bg-red-50 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
