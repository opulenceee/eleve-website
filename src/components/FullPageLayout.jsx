import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Navigation from "./Navigation";
import nala from "../assets/video/nala.mp4";
import model2 from "../assets/images/model2.png";
import model3 from "../assets/images/model3.png";
import model4 from "../assets/images/model4.png";
import model5 from "../assets/images/model5.png";
import { Link } from "react-router-dom";
import PartnershipSection from "../components/PartnershipSection";
import FAQ from "./FAQ";

const FullPageLayout = () => {
  const handleEmail = (e) => {
    e.preventDefault();
    window.location.href = "mailto:support@eleve.space";
  };

  const handleForumPM = (e) => {
    e.preventDefault();
    window.open("https://forum.gta.world/en/profile/78653-boombatz/", "_blank");
  };
  const { isDark } = useTheme();
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div
      className={`min-h-screen font-libre transition-colors duration-300 ${
        isDark ? "bg-[#2E1437] text-[#F3F3F3]" : "bg-[#F8F4F9] text-[#2E1437]"
      }`}
    >
      <Navigation />

      {/* Hero Section - Full screen with parallax effect */}
      <section
        id="partnerships"
        className="relative h-[100vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#2E1437]/90 via-[#4A1259]/70 to-transparent z-10" />
          <video
            src={nala}
            className="w-full h-full object-cover scale-[1.02]"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
        </div>

        <div className="relative z-20 w-full">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-8xl font-cormorant font-bold mb-6 leading-none">
                Elevate Your
                <span className="block text-[#9C6B98] mt-2">Entertainment</span>
              </h1>
              <p className="text-2xl font-light leading-relaxed mb-12 text-[#E5D4E7]">
                Los Santos' premier adult entertainment agency
              </p>
              <div className="flex gap-8 justify-center">
                <Link
                  to="/book"
                  className="px-12 py-5 bg-[#9C6B98] text-white hover:bg-[#4A1259] transition-all duration-300 group"
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                    Book Now →
                  </span>
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("partnerships")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-12 py-5 border border-[#9C6B98] text-[#E5D4E7] hover:bg-[#9C6B98]/10 transition-all duration-300"
                >
                  Our Story
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#9C6B98] to-transparent" />
        </motion.div>
      </section>
      <PartnershipSection isDark={isDark} />

      {/* Services Section - Asymmetrical grid */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-6xl font-cormorant font-bold mb-6">
              Exceptional <span className="text-[#9C6B98]">Services</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#9C6B98] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left column - Text content */}
            <div className="col-span-12 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
              >
                <p
                  className={`text-xl leading-relaxed mb-8 ${
                    isDark ? "text-[#E5D4E7]" : "text-[#2E1437]/80"
                  }`}
                >
                  Elevate your experience with our premium entertainment
                  services. Our team brings sophistication, allure and energy to
                  every occasion.
                </p>
                <Link
                  to="/book"
                  className="inline-block px-8 py-4 border border-[#9C6B98] hover:bg-[#9C6B98] hover:text-white transition-all duration-300"
                >
                  Inquire Now
                </Link>
              </motion.div>
            </div>

            {/* Right column - Services grid */}
            <div className="col-span-12 md:col-span-7">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    title: "Club Entertainment",
                    description:
                      "Professional dancers and escorts for upscale venues",
                    icon: "🍑",
                  },
                  {
                    title: "Private & Exclusive Events",
                    description: "Exclusive performances for select gatherings",
                    icon: "💋",
                  },
                  {
                    title: "High-Class Entertainment",
                    description:
                      "Luxury entertainment and escort services for refined occasions",
                    icon: "⭐",
                  },
                  {
                    title: "VIP Escort Experience",
                    description:
                      "Personalized, high-end escort and dance services",
                    icon: "💎",
                  },
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredService(service.title)}
                    onHoverEnd={() => setHoveredService(null)}
                    className={`p-8 border transition-all duration-500 ${
                      isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                    } ${
                      hoveredService === service.title ? "bg-[#9C6B98]/10" : ""
                    }`}
                  >
                    <span className="text-3xl mb-4 block">{service.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-[#E5D4E7]/80" : "text-[#2E1437]/60"
                      }`}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performers Section - Fullwidth gallery */}
      <section id="performers" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2E1437]/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-cormorant font-bold mb-6">
              Featured <span className="text-[#9C6B98]">Talents</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#9C6B98] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: "Aria", img: model3 },
              { name: "Luna", img: model4 },
              { name: "Phoenix", img: model5 },
            ].map((performer, index) => (
              <motion.div
                key={performer.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={performer.img}
                    alt={performer.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E1437] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-cormorant font-bold text-white mb-2">
                      {performer.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ isDark={isDark} isCompact={true} />

      {/* Footer */}
      <footer className="bg-[#2E1437] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-3xl font-cormorant font-bold mb-6">
                <span className="text-white">ELEVE</span>
                <span className="text-[#9C6B98]">NOIR</span>
              </h3>
              <p className="text-[#E5D4E7]/80">
                Premium exotic dance entertainment for discerning clients.
              </p>
            </div>
            <div>
              <h4 className="text-[#9C6B98] font-bold mb-4">Contact</h4>
              <p className="text-[#E5D4E7]">📞 51100</p>
              <p className="text-[#E5D4E7]">📍 Vinewood, Los Santos</p>
            </div>
            <div>
              <h4 className="text-[#9C6B98] font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link
                  to="/terms"
                  className="block text-[#E5D4E7] hover:text-[#9C6B98] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/privacy"
                  className="block text-[#E5D4E7] hover:text-[#9C6B98] transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-[#9C6B98] font-bold mb-4">Social</h4>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://face.gta.world/pages/eleve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#E5D4E7] hover:text-[#9C6B98] transition-colors"
                >
                  👍 Facebrowser
                </a>
                <a
                  href="#"
                  onClick={handleEmail}
                  className="inline-block text-[#E5D4E7] hover:text-[#9C6B98] transition-colors"
                >
                  ✉️ Email Us
                </a>
                <a
                  href="#"
                  onClick={handleForumPM}
                  className="inline-block text-[#E5D4E7] hover:text-[#9C6B98] transition-colors"
                >
                  💬 Send PM
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#9C6B98]/20 mt-16 pt-8 text-center text-[#E5D4E7]/60">
            <p className="mb-4">
              Copyright © {new Date().getFullYear()} EleveNoir Entertainment
            </p>
            <p>
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

export default FullPageLayout;
