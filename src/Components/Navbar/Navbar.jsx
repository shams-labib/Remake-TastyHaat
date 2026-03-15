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
    <header className="sticky top-0 z-[100] bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md transition-colors">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
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
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 shadow-lg hover:scale-105 transition-all duration-300"
              >
                Login Now
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/user.png"}
                    className="h-8 w-8 rounded-full object-cover"
                    alt="user"
                  />
                  <HiChevronDown
                    className={`text-gray-600 dark:text-gray-300 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="px-4 py-3 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm text-gray-900 dark:text-white font-bold truncate">
                        {user?.displayName || "User"}
                      </p>
                    </div>

                    <Link
                      to="/dashboard/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 text-sm hover:bg-primary/10 hover:text-primary transition"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        signOutUser();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
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
            className="md:hidden rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[500px] opacity-100 pb-6"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => {
              if (link.to === "/dashboard" && !user) return null;
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-xl bg-primary py-3 text-center text-base font-bold text-white shadow-lg active:scale-95 transition"
                >
                  Login Now
                </Link>
              ) : (
                <div className="space-y-1">
                  <div className="px-4 py-2 mb-2 flex items-center gap-3">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/ZYW3VTp/user.png"
                      }
                      className="h-10 w-10 rounded-full border-2 border-primary"
                      alt="user"
                    />
                    <div>
                      <p className="font-bold dark:text-white leading-none">
                        {user?.displayName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Gourmet Member
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOutUser();
                      setIsOpen(false);
                    }}
                    className="w-full block rounded-lg px-4 py-3 text-sm text-red-600 text-left hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
