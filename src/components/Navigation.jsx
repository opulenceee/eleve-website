import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navigation = () => {
  const { isDark, setIsDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [hoveredItem, setHoveredItem] = useState(null);

  const scrollToSection = (sectionId) => {
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
          {/* Logo */}
          <motion.div
            className="text-3xl font-cormorant font-bold cursor-pointer tracking-wider w-1/4"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
          >
            <span className={isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"}>
              ELEVE
            </span>
            <span className="text-[#9C6B98]">NOIR</span>
          </motion.div>

          {/* Centered Navigation */}
          {isHome && (
            <nav className="hidden md:flex items-center justify-center flex-grow">
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

          {/* Right Side Items */}
          <div className="flex items-center space-x-4 w-1/4 justify-end">
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
      </div>
    </motion.header>
  );
};

export default Navigation;
