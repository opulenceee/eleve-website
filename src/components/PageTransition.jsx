import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageTransition = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduce initial loading time from 1500ms to 800ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Add check for window loaded state
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", () => setIsLoading(false));
      return () =>
        window.removeEventListener("load", () => setIsLoading(false));
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              className="text-4xl font-bold mb-4"
              animate={{
                color: ["#ffffff", "#f8a2e1", "#ffffff"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ELEVE
            </motion.div>
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 rounded-full bg-[#f8a2e1]"
                  animate={{
                    y: ["0%", "-50%", "0%"],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: index * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
