import React from "react";
import { motion } from "framer-motion";
import LegalPageLayout from "./LegalPageLayout";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "We collect the following information that you provide directly to us:",
        [
          "Name and contact information",
          "Age and physical measurements (for performers)",
          "Professional experience and portfolios",
          "Social media handles",
          "Event preferences and availability",
          "Booking history and preferences",
        ],
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "We use your information for the following purposes:",
        [
          "Process and manage bookings",
          "Match talents with appropriate venues",
          "Communicate about events and opportunities",
          "Maintain our talent database",
          "Coordinate scheduling and logistics",
          "Improve our services",
        ],
      ],
    },
    {
      title: "3. Information Sharing",
      content: [
        "We may share your information with:",
        [
          "Venue managers (with consent)",
          "Event organizers",
          "Required legal authorities",
          "Professional photography teams",
        ],
        "We do not sell or share your personal information with third parties for marketing purposes.",
      ],
    },
    {
      title: "4. Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.",
        "While we use industry-standard practices, no method of transmission over the internet is 100% secure.",
      ],
    },
    {
      title: "5. Your Rights",
      content: [
        "You have the following rights regarding your information:",
        [
          "Access your personal information",
          "Request corrections to your data",
          "Request deletion of your information",
          "Opt-out of communications",
          "Request a copy of your data",
          "Withdraw consent at any time",
        ],
      ],
    },
    {
      title: "6. Contact Information",
      content: [
        "For any privacy-related concerns or requests, please contact us through our official channels. We aim to respond to all inquiries within 24 hours.",
      ],
    },
  ];

  return (
    <LegalPageLayout title="Privacy Policy">
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
                <p className="text-[#E5D4E7]/80 leading-relaxed">{paragraph}</p>
              )}
            </div>
          ))}
        </motion.section>
      ))}
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
