import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eclipse from "../assets/images/eclipse.png";
import bahamas from "../assets/images/bahamas.png";
import tequila from "../assets/images/odyssey15.png";

const PartnershipSection = ({ isDark }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      name: "Eclipse Lounge",
      role: "Premium Nightclub",
      text: "EleveNoir's performers consistently exceed expectations, bringing sophistication and energy that perfectly matches our upscale atmosphere.",
      rating: 5,
      image: eclipse,
    },
    {
      name: "Bahama Mamas West",
      role: "Luxury Entertainment Venue",
      text: "Working with EleveNoir has been exceptional. Their professional approach and outstanding talent selection have made them our exclusive entertainment partner.",
      rating: 5,
      image: bahamas,
    },
    {
      name: "Odyssey 15",
      role: "Exclusive Club",
      text: "The caliber of performers from EleveNoir is unmatched. They understand our high standards and consistently deliver exceptional entertainment.",
      rating: 5,
      image: tequila,
    },
  ];

  const advanceSlide = useCallback(() => {
    if (!isPaused) {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  }, [isPaused, testimonials.length]);

  React.useEffect(() => {
    const timer = setInterval(advanceSlide, 5000);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex(
      (prev) =>
        (prev + newDirection + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E1437]/5 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-cormorant font-bold mb-6">
            Trusted by <span className="text-[#9C6B98]">Leading Venues</span>
          </h2>
          <div className="w-24 h-[1px] bg-[#9C6B98] mx-auto" />
        </motion.div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: 300 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 * direction }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className={`p-8 border relative ${
                    isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                  } transition-all duration-300 hover:border-[#9C6B98]`}
                >
                  <p
                    className={`text-xl leading-relaxed mb-8 ${
                      isDark ? "text-[#E5D4E7]" : "text-[#2E1437]"
                    }`}
                  >
                    {testimonials[activeIndex].text}
                  </p>
                  <div>
                    <h3 className="text-2xl font-cormorant font-bold">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-[#9C6B98]">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > activeIndex ? 1 : -1);
                        setActiveIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "w-8 bg-[#9C6B98]"
                          : "bg-[#9C6B98]/20 hover:bg-[#9C6B98]/40"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1437]/50 to-transparent" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Update these button classes */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-[-50px] top-1/2 -translate-y-1/2 p-3 text-[#9C6B98] hover:text-white hover:bg-[#9C6B98] transition-all duration-300 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-[-50px] top-1/2 -translate-y-1/2 p-3 text-[#9C6B98] hover:text-white hover:bg-[#9C6B98] transition-all duration-300 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
