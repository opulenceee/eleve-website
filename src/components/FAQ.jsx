import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const FAQ = ({ isDark, isCompact = false }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What types of events do you cater to?",
      answer:
        "We specialize in providing entertainment for upscale venues, private events, corporate functions, and exclusive gatherings. Our performers are experienced in creating the perfect atmosphere for any high-end event.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 2-3 weeks in advance for regular events, and 1-2 months for special occasions or large events. However, we also accommodate last-minute requests based on availability.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our standard cancellation policy requires 48 hours notice. Different terms may apply for larger events or special bookings. Please contact us for specific details regarding your event.",
    },
    {
      question: "Do you provide performers for private events?",
      answer:
        "Yes, we offer discrete, professional entertainment services for private events. All our performers are experienced in maintaining the highest standards of professionalism and confidentiality.",
    },
    {
      question: "What is your screening process for performers?",
      answer:
        "All our performers undergo thorough professional screening, including experience verification, professional reference checks, and in-person auditions to ensure they meet our high standards.",
    },
    {
      question: "Do you have minimum booking requirements?",
      answer:
        "Yes, we have minimum booking durations that vary by event type. Please contact us directly for specific requirements related to your event.",
    },
  ];

  // Show only first 3 FAQs if compact mode is enabled
  const displayFaqs = isCompact ? faqs.slice(0, 3) : faqs;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-cormorant font-bold mb-6">
            Frequently Asked <span className="text-[#9C6B98]">Questions</span>
          </h2>
          <div className="w-24 h-[1px] bg-[#9C6B98] mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-4 border ${
                isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
              } hover:border-[#9C6B98] transition-all duration-300`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#9C6B98]"
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p
                      className={`px-6 py-4 border-t ${
                        isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                      } ${isDark ? "text-[#E5D4E7]/80" : "text-[#2E1437]/80"}`}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {isCompact && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              to="/book"
              className="inline-block px-8 py-4 border border-[#9C6B98] text-[#9C6B98] hover:bg-[#9C6B98] hover:text-white transition-all duration-300"
            >
              View All FAQs
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
