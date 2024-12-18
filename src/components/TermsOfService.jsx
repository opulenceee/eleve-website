import React from "react";
import { motion } from "framer-motion";
import LegalPageLayout from "./LegalPageLayout";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content: [
        "By accessing or using EleveNoir's services, you agree to be bound by these Terms of Service. These terms apply to all users, including performers, clients, and visitors to our website.",
      ],
    },
    {
      title: "2. Service Description",
      content: [
        "EleveNoir provides premium entertainment services and talent management for upscale venues and exclusive events. Our services include performer booking, event coordination, and professional entertainment solutions.",
      ],
    },
    {
      title: "3. User Responsibilities",
      content: [
        "As a user of our services, you have certain responsibilities:",
        [
          "Provide accurate and truthful information",
          "Maintain professional conduct during all interactions",
          "Comply with all applicable laws and regulations",
          "Respect confidentiality agreements",
          "Be at least 18 years of age to use our services",
        ],
      ],
    },
    {
      title: "4. Booking and Payments",
      content: [
        "All bookings must be made through official channels. Payment terms and cancellation policies will be specified in individual booking agreements.",
      ],
    },
    {
      title: "5. Professional Conduct",
      content: [
        "All parties are expected to maintain the highest standards of professional conduct. This includes:",
        [
          "Respecting boundaries and privacy",
          "Adhering to venue policies and guidelines",
          "Maintaining confidentiality",
          "Following appropriate dress codes",
          "Being punctual and reliable",
        ],
      ],
    },
    {
      title: "6. Limitation of Liability",
      content: [
        "EleveNoir is not liable for any indirect, incidental, or consequential damages arising from the use of our services or participation in our events.",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | EleveNoir Entertainment</title>
      </Helmet>
      <LegalPageLayout title="Terms of Service">
        {sections.map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`p-8 border transition-all duration-300 hover:border-[#9C6B98] ${"border-[#9C6B98]/20"}`}
          >
            <h2 className="text-2xl font-cormorant font-bold mb-6 text-[#9C6B98]">
              {section.title}
            </h2>
            {section.content.map((paragraph, pIndex) => (
              <div key={pIndex} className="mb-4">
                {Array.isArray(paragraph) ? (
                  <ul className="list-disc pl-6 space-y-2 text-[#E5D4E7]/80">
                    {paragraph.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#E5D4E7]/80 leading-relaxed">
                    {paragraph}
                  </p>
                )}
              </div>
            ))}
          </motion.section>
        ))}
      </LegalPageLayout>
    </>
  );
};

export default TermsOfService;
