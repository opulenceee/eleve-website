import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/images/logo.png";

const Navigation = () => {
  const { isDark, setIsDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); // Close mobile menu when navigating
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark
          ? "bg-[#2E1437]/80 border-[#9C6B98]/20"
          : "bg-[#F8F4F9]/90 border-[#9C6B98]/20"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-24">
          {/* Logo - Now with a fixed width */}
          <motion.div
            className="cursor-pointer mt-4 w-52" /* Added fixed width to match logo */
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={logo}
              alt="EleveNoir Logo"
              className="w-52 h-auto object-contain"
            />
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"}
            >
              {isMenuOpen ? (
                <path
                  strokeWidth="2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              ) : (
                <>
                  <path
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </>
              )}
            </motion.svg>
          </button>

          {/* Desktop Navigation */}
          <div className="flex-1 flex justify-center">
            {isHome && (
              <nav className="hidden md:flex items-center justify-center">
                {["partnerships", "services", "performers"].map((item) => (
                  <motion.div
                    key={item}
                    className="relative px-6"
                    onHoverStart={() => setHoveredItem(item)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <motion.button
                      onClick={() => scrollToSection(item)}
                      className={`${
                        isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
                      } transition-colors font-light tracking-wider relative z-10`}
                      whileHover={{ y: -2 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                    <AnimatePresence>
                      {hoveredItem === item && (
                        <motion.div
                          className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#9C6B98] mx-6"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>
            )}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4 w-52 justify-end">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 border border-[#9C6B98]/20 rounded-full ${
                isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
              } hover:border-[#9C6B98] transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? "🌙" : "☀️"}
            </motion.button>

            {/* Book Now Button */}
            <motion.button
              onClick={() => navigate("/book")}
              className={`px-6 py-3 border border-[#9C6B98] ${
                isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
              } hover:bg-[#9C6B98] hover:text-white transition-all duration-300 relative overflow-hidden group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Book Now</span>
              <motion.div
                className="absolute inset-0 bg-[#9C6B98] z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#9C6B98]/20"
            >
              {isHome && (
                <div className="py-4 space-y-4">
                  {["partnerships", "services", "performers"].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`block w-full text-left px-4 py-2 ${
                        isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
                      }`}
                      whileHover={{ x: 10 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between p-4 border-t border-[#9C6B98]/20">
                <motion.button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 border border-[#9C6B98]/20 rounded-full ${
                    isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDark ? "🌙" : "☀️"}
                </motion.button>
                <motion.button
                  onClick={() => navigate("/book")}
                  className={`px-6 py-3 border border-[#9C6B98] ${
                    isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
                  } hover:bg-[#9C6B98] hover:text-white`}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navigation;
