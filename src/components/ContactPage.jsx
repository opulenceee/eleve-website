import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ContactPage = () => {
  const { isDark } = useTheme();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [userType, setUserType] = useState("client");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#faq-section") {
      setTimeout(() => {
        const element = document.getElementById("faq-section");
        if (element) {
          const offset = 100; // Adjust this value to control how far above the section it scrolls
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location]);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

  const validateFileSize = (file) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setFileError(
        "File size exceeds 50MB limit. Please choose a smaller file or compress the image."
      );
      return false;
    }
    setFileError(null);
    return true;
  };

  const handleEmail = (e) => {
    e.preventDefault();
    window.location.href = "mailto:support@eleve.space";
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    venueName: "",
    age: "",
    facebrowser: "",
    measurements: "",
    message: "",
    attachment: null,
    workType: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    if (submitError) setSubmitError(null);
  };

  const inputStyles = `w-full px-6 py-4 bg-transparent border ${
    isDark
      ? "border-[#9C6B98]/20 text-[#E5D4E7] focus:border-[#9C6B98]"
      : "border-[#2E1437]/20 text-[#2E1437] focus:border-[#2E1437]"
  } transition-all duration-300 focus:outline-none hover:border-[#9C6B98]`;

  const buttonStyles = `w-full px-8 py-4 transition-all duration-300 ${
    isDark
      ? "bg-[#9C6B98] text-white hover:bg-[#4A1259]"
      : "bg-[#2E1437] text-white hover:bg-[#4A1259]"
  } disabled:opacity-50 disabled:cursor-not-allowed`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setSubmitError(
        "You must confirm your age and agree to the privacy policy."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formDataToSend = new FormData();

      // Add all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      // Add user type
      formDataToSend.append(
        "userType",
        userType === "performer" ? "Model" : userType
      );

      const response = await fetch("https://eleve.space/submit-form", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          phone: "",
          venueName: "",
          age: "",
          facebrowser: "",
          measurements: "",
          message: "",
          attachment: null,
          workType: "",
        });
        setAgreeToTerms(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | EleveNoir Entertainment</title>
      </Helmet>

      <div
        className={`min-h-screen ${
          isDark ? "bg-[#2E1437] text-[#E5D4E7]" : "bg-[#F8F4F9] text-[#2E1437]"
        }`}
      >
        <Navigation />

        <div className="pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-6xl font-cormorant font-bold mb-6">
                  Let's <span className="text-[#9C6B98]">Connect</span>
                </h1>
                <div className="w-24 h-[1px] bg-[#9C6B98] mx-auto" />
              </motion.div>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 border border-[#9C6B98] mb-8 text-center"
                  >
                    <p className="text-[#9C6B98] font-medium">
                      Thank you for your submission! We'll be in touch soon.
                    </p>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 border border-red-500/20 mb-8 text-center"
                  >
                    <p className="text-red-400">{submitError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex gap-4">
                      {["client", "performer"].map((type) => (
                        <motion.button
                          key={type}
                          type="button"
                          className={`flex-1 px-6 py-4 border transition-all duration-300 ${
                            userType === type
                              ? "bg-[#9C6B98] text-white border-[#9C6B98]"
                              : isDark
                              ? "border-[#9C6B98]/20 text-[#E5D4E7]"
                              : "border-[#2E1437]/20 text-[#2E1437]"
                          }`}
                          onClick={() => setUserType(type)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          I'm a {type.charAt(0).toUpperCase() + type.slice(1)}
                        </motion.button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={userType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        {userType === "client" ? (
                          <>
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className={inputStyles}
                              disabled={isSubmitting}
                            />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className={inputStyles}
                              disabled={isSubmitting}
                            />
                            <input
                              type="text"
                              name="venueName"
                              placeholder="Venue/Company Name"
                              value={formData.venueName}
                              onChange={handleInputChange}
                              required
                              className={inputStyles}
                              disabled={isSubmitting}
                            />
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-6">
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className={inputStyles}
                                disabled={isSubmitting}
                              />
                              <input
                                type="number"
                                name="age"
                                min="18"
                                max="100"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                                className={inputStyles}
                                disabled={isSubmitting}
                              />
                            </div>

                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className={inputStyles}
                              disabled={isSubmitting}
                            />

                            <input
                              type="text"
                              name="facebrowser"
                              placeholder="Facebrowser Profile"
                              value={formData.facebrowser}
                              onChange={handleInputChange}
                              required
                              className={inputStyles}
                              disabled={isSubmitting}
                            />

                            <div className="space-y-1">
                              <input
                                type="text"
                                name="measurements"
                                placeholder="Measurements"
                                value={formData.measurements}
                                onChange={handleInputChange}
                                required
                                className={inputStyles}
                                disabled={isSubmitting}
                              />
                              <p
                                className={`text-sm ${
                                  isDark
                                    ? "text-[#E5D4E7]/60"
                                    : "text-[#2E1437]/60"
                                }`}
                              >
                                Format: Bust-Waist-Hips (e.g., 32C-23-35)
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {[
                                {
                                  value: "Atmosphere Model",
                                  label: "Atmosphere Model",
                                },
                                {
                                  value: "Exotic Dancer",
                                  label: "Exotic Dancer",
                                },
                                {
                                  value: "Production Model",
                                  label: "Production Model",
                                },
                                { value: "Influencer", label: "Influencer" },
                              ].map((option) => (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() =>
                                    handleInputChange({
                                      target: {
                                        name: "workType",
                                        value: option.value,
                                      },
                                    })
                                  }
                                  className={`px-6 py-3 border transition-all duration-300 ${
                                    formData.workType === option.value
                                      ? "bg-[#9C6B98] text-white border-[#9C6B98]"
                                      : isDark
                                      ? "border-[#9C6B98]/20"
                                      : "border-[#2E1437]/20"
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  disabled={isSubmitting}
                                >
                                  {option.label}
                                </motion.button>
                              ))}
                            </div>

                            <div className="space-y-1">
                              <input
                                type="file"
                                name="attachment"
                                onChange={handleInputChange}
                                accept=".jpg,.jpeg,.png,.gif"
                                className={inputStyles}
                                disabled={isSubmitting}
                              />
                              <p
                                className={`text-sm ${
                                  isDark
                                    ? "text-[#E5D4E7]/60"
                                    : "text-[#2E1437]/60"
                                }`}
                              >
                                Please add a recent selfie (Maximum size: 50MB)
                              </p>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms-checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        required
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="terms-checkbox" className="text-sm">
                        I confirm that I am at least 18 years old (( IC and OOC
                        )) and agree to the{" "}
                        <Link
                          to="/privacy"
                          className="text-[#9C6B98] hover:underline"
                        >
                          privacy policy
                        </Link>
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      className={buttonStyles}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <span className="mr-2">Submitting</span>
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ...
                          </motion.span>
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div
                      className={`p-8 border ${
                        isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                      }`}
                    >
                      <h3 className="text-2xl font-cormorant font-bold mb-4">
                        Why Choose Us
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                          <span>✨</span>
                          <span>
                            Premium talent selection for high-end venues
                          </span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span>🌟</span>
                          <span>Professional and discrete service</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span>💫</span>
                          <span>Experienced performers and entertainers</span>
                        </li>
                      </ul>
                    </div>

                    <div
                      className={`p-8 border ${
                        isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                      }`}
                    >
                      <h3 className="text-2xl font-cormorant font-bold mb-4">
                        Contact Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <span>📞</span>
                          <span className="text-lg">51100</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span>📍</span>
                          <span className="text-lg">Vinewood, Los Santos</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span>👍</span>
                          <a
                            href="https://face.gta.world/pages/eleve"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-[#9C6B98] hover:underline"
                          >
                            Facebrowser Page
                          </a>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-8 border ${
                        isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                      }`}
                    >
                      <h3 className="text-2xl font-cormorant font-bold mb-4">
                        Hours
                      </h3>
                      <div className="space-y-2">
                        <p>Always available for bookings</p>
                        <p className="text-sm opacity-70">
                          Please allow up to 24 hours for a response
                        </p>
                      </div>
                    </div>

                    {userType === "performer" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`p-8 border ${
                          isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                        }`}
                      >
                        <h3 className="text-2xl font-cormorant font-bold mb-4">
                          For Performers
                        </h3>
                        <p className="mb-4">
                          Join Los Santos' premier entertainment agency. We
                          offer:
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-3">
                            <span>💎</span>
                            <span>Exclusive venue partnerships</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span>🔒</span>
                            <span>Professional management</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span>💫</span>
                            <span>Career growth opportunities</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq-section">
          <FAQ isDark={isDark} isCompact={false} />
        </div>

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
    </>
  );
};

export default ContactPage;
