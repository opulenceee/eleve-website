import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { useTheme } from "../context/ThemeContext";

const TalentContract = () => {
  const { isDark } = useTheme();
  const [showContract, setShowContract] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    signature: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const PRESET_PASSWORD = "elevetalent";

  const getCurrentDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const getModelNameFromUsername = (username) => {
    const parts = username.split("_");
    if (parts.length === 2) {
      const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      const lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      return `${firstName} ${lastName}`;
    }
    return "";
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const usernameParts = formData.username.split("_");
    if (
      usernameParts.length !== 2 ||
      usernameParts[0].charAt(0) !== usernameParts[0].charAt(0).toUpperCase() ||
      usernameParts[1].charAt(0) !== usernameParts[1].charAt(0).toUpperCase()
    ) {
      alert(
        "Username must be in the format FirstName_LastName, with both names capitalized."
      );
      return;
    }

    if (formData.password === PRESET_PASSWORD) {
      setShowContract(true);
    } else {
      alert("Incorrect password, please try again.");
    }
  };

  const handleSubmitContract = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert("You must agree to the privacy policy.");
      return;
    }

    const modelName = getModelNameFromUsername(formData.username);
    if (formData.signature !== modelName) {
      alert("Your signature must match your full name.");
      return;
    }

    const submitData = new FormData();
    submitData.append("submissionType", "Contract");
    submitData.append("name", modelName);
    submitData.append("signature", formData.signature);
    submitData.append("dateSigned", getCurrentDate());
    submitData.append("username", formData.username);

    try {
      const response = await fetch("https://eleve.space/submit-form", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = "/";
      } else {
        alert(result.message || "Failed to submit the contract.");
      }
    } catch (error) {
      console.error("Error submitting the contract:", error);
      alert("An error occurred while submitting the contract.");
    }
  };

  const inputStyles = `w-full px-6 py-4 bg-transparent border ${
    isDark
      ? "border-[#9C6B98]/20 text-[#E5D4E7] focus:border-[#9C6B98]"
      : "border-[#2E1437]/20 text-[#2E1437] focus:border-[#2E1437]"
  } transition-all duration-300 focus:outline-none hover:border-[#9C6B98]`;

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#2E1437] text-[#E5D4E7]" : "bg-[#F8F4F9] text-[#2E1437]"
      }`}
    >
      <Navigation />

      {/* Main Content */}
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!showContract ? (
              <div
                className={`p-8 border ${
                  isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                }`}
              >
                <h1 className="text-4xl font-cormorant font-bold mb-8 text-center">
                  Access Contract
                </h1>
                <form
                  onSubmit={handleLogin}
                  className="space-y-6 max-w-md mx-auto"
                >
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter FirstName_LastName"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password here"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#9C6B98] text-white hover:bg-[#4A1259] transition-all duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <div
                className={`p-8 border ${
                  isDark ? "border-[#9C6B98]/20" : "border-[#2E1437]/20"
                }`}
              >
                <h2 className="text-4xl font-cormorant font-bold mb-8 text-center">
                  Talent Contract
                </h2>
                <div className="space-y-8 mb-8">
                  <p>
                    This Talent Agreement is made and entered into on{" "}
                    {getCurrentDate()}, by and between Vinewood Entertainment,
                    LLC, DBA ELEVENOIR ("Agency") and{" "}
                    {getModelNameFromUsername(formData.username)} ("Model").
                  </p>

                  {/* Contract sections */}
                  <section>
                    <h4 className="text-2xl font-semibold text-[#9C6B98] mb-4">
                      Scope of Agreement
                    </h4>
                    <p
                      className={
                        isDark ? "text-[#E5D4E7]/80" : "text-[#2E1437]/80"
                      }
                    >
                      The Agency agrees to hire the Model, and the Model agrees
                      to provide services such as modeling, dancing, or any
                      other relevant services for the Agency, as requested and
                      agreed upon.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-2xl font-semibold text-[#9C6B98] mb-4">
                      Term of Agreement
                    </h4>
                    <p
                      className={
                        isDark ? "text-[#E5D4E7]/80" : "text-[#2E1437]/80"
                      }
                    >
                      The term of this Agreement will begin on{" "}
                      {getCurrentDate()} and will remain in effect until
                      terminated as per the terms provided in this Agreement.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-2xl font-semibold text-[#9C6B98] mb-4">
                      Exclusivity
                    </h4>
                    <p
                      className={
                        isDark ? "text-[#E5D4E7]/80" : "text-[#2E1437]/80"
                      }
                    >
                      The Model agrees to work exclusively with the Agency for
                      the duration of this Agreement. During this time, the
                      Model shall not engage in any modeling, promotional work,
                      or other services for any other company, agency, or
                      individual without prior written consent from the Agency's
                      management.
                    </p>
                  </section>
                </div>

                <form onSubmit={handleSubmitContract} className="space-y-6">
                  <input
                    type="text"
                    name="signature"
                    placeholder="Signature *"
                    value={formData.signature}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                  />
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy-policy"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1.5"
                    />
                    <label htmlFor="privacy-policy" className="text-sm">
                      By typing my signature above, I confirm that I am at least
                      18 years old (( IC and OOC )), and I understand that
                      typing my name constitutes my electronic signature. I
                      agree that this electronic signature has the same legal
                      effect as a handwritten signature, and I am entering into
                      a legally binding contract.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#9C6B98] text-white hover:bg-[#4A1259] transition-all duration-300"
                  >
                    Sign Contract
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
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
              <p className="text-[#E5D4E7]">📞 48030894</p>
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
              <a
                href="https://face.gta.world/pages/eleve"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#E5D4E7] hover:text-[#9C6B98] transition-colors"
              >
                👍 Facebrowser
              </a>
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

export default TalentContract;
