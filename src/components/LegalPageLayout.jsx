import React from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import { useTheme } from "../context/ThemeContext";

const LegalPageLayout = ({ title, children }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#2E1437] text-[#E5D4E7]" : "bg-[#F8F4F9] text-[#2E1437]"
      }`}
    >
      <Navigation />

      {/* Hero Section */}
      <div className="relative min-h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E1437]/80 to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-4"
        >
          <h1 className="text-6xl font-cormorant font-bold mb-4">
            <span className="text-[#9C6B98]">{title}</span>
          </h1>
          <p
            className={`text-lg ${
              isDark ? "text-[#E5D4E7]/80" : "text-[#2E1437]/80"
            }`}
          >
            Last updated: December 14, 2024
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2E1437] text-[#E5D4E7] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#E5D4E7]/60">
              Copyright © {new Date().getFullYear()} EleveNoir Entertainment
            </p>
            <p className="text-[#E5D4E7]/60 mt-2">
              This is a roleplay website for the GTA V server{" "}
              <a
                href="https://www.ucp.world"
                className="text-[#9C6B98] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GTA World
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalPageLayout;
