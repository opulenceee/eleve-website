import React, { useState } from "react";
import { scrollToSection } from "../components/NavUtils";
import { Link } from "react-router-dom";

const TalentContract = () => {
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

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#141414]/90 backdrop-blur-sm border-b border-[#f8a2e1]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div
              className="text-2xl font-bold cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <span className="text-white">ELEVE</span>
              <span className="text-[#f8a2e1]">LS</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => (window.location.href = "/")}
                className="text-white hover:text-[#f8a2e1] transition-colors"
              >
                Home
              </button>
            </nav>

            <button
              onClick={() => (window.location.href = "/#contact")}
              className="px-6 py-2 border-2 border-[#f8a2e1] rounded-full text-white hover:bg-[#f8a2e1] hover:text-black transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {!showContract ? (
            <div className="bg-black/30 p-8 rounded-xl border border-[#f8a2e1]/20">
              <h1 className="text-4xl font-bold mb-8 text-center">
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
                  className="w-full px-6 py-3 bg-white/10 rounded-lg border border-gray-700"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password here"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 bg-white/10 rounded-lg border border-gray-700"
                />
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[#f8a2e1] text-black rounded-full hover:bg-[#f8a2e1]/80 transition-all duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-black/30 p-8 rounded-xl border border-[#f8a2e1]/20">
              <h2 className="text-4xl font-bold mb-8 text-center">
                Talent Contract
              </h2>
              <div className="space-y-8 mb-8">
                <p>
                  This Talent Agreement is made and entered into on{" "}
                  {getCurrentDate()}, by and between Los Angels Entertainment,
                  LLC, DBA PLUSH ("Agency") and{" "}
                  {getModelNameFromUsername(formData.username)} ("Model").
                </p>

                {/* Contract sections */}
                <section>
                  <h4 className="text-2xl font-semibold text-[#f8a2e1] mb-4">
                    Scope of Agreement
                  </h4>
                  <p className="text-gray-300">
                    The Agency agrees to hire the Model, and the Model agrees to
                    provide services such as modeling, dancing, or any other
                    relevant services for the Agency, as requested and agreed
                    upon.
                  </p>
                </section>

                <section>
                  <h4 className="text-2xl font-semibold text-[#f8a2e1] mb-4">
                    Term of Agreement
                  </h4>
                  <p className="text-gray-300">
                    The term of this Agreement will begin on {getCurrentDate()}{" "}
                    and will remain in effect until terminated as per the terms
                    provided in this Agreement.
                  </p>
                </section>

                <section>
                  <h4 className="text-2xl font-semibold text-[#f8a2e1] mb-4">
                    Exclusivity
                  </h4>
                  <p className="text-gray-300">
                    The Model agrees to work exclusively with the Agency for the
                    duration of this Agreement. During this time, the Model
                    shall not engage in any modeling, promotional work, or other
                    services for any other company, agency, or individual
                    without prior written consent from the Agency's management.
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
                  className="w-full px-6 py-3 bg-white/10 rounded-lg border border-gray-700"
                />
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1.5"
                  />
                  <label
                    htmlFor="privacy-policy"
                    className="text-sm text-gray-300"
                  >
                    By typing my signature above, I confirm that I am at least
                    18 years old (( IC and OOC )), and I understand that typing
                    my name constitutes my electronic signature. I agree that
                    this electronic signature has the same legal effect as a
                    handwritten signature, and I am entering into a legally
                    binding contract.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[#f8a2e1] text-black rounded-full hover:bg-[#f8a2e1]/80 transition-all duration-300"
                >
                  Sign Contract
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#141414] text-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="bg-[#141414] border border-[#4f4f4f] rounded-[20px] p-6 mb-8">
            <div className="flex flex-wrap justify-between items-center gap-6">
              <div className="text-center">
                <a href="/">
                  <img
                    src="/assets/img/logo.png"
                    alt="Eleve Los Santos"
                    className="max-w-[100px] mx-auto"
                  />
                </a>
              </div>
              <div className="text-center">
                <a
                  href="https://face.gta.world/pages/eleve"
                  target="_blank"
                  className="inline-block px-6 py-2 border-2 border-white hover:border-[#f8a2e1] rounded-full text-xl font-bold transition-all duration-300 hover:text-[#f8a2e1]"
                >
                  👍 Facebrowser
                </a>
              </div>
              <div className="text-center">
                <span className="text-xl font-medium">📞 48030894</span>
              </div>
              <div className="text-center">
                <span className="text-xl font-medium">
                  📍 Vinewood, Los Santos
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center py-4 border-b-2 border-[#f8a2e1]">
            <div className="text-gray-400">
              Copyright © Vinewood Entertainment
            </div>
            <div className="space-x-4">
              <a
                href="/terms"
                className="text-[#f8a2e1] hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-[#f8a2e1] hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-center text-gray-400 mt-8">
            <p>
              This is a roleplay website for the GTA V server{" "}
              <a
                href="https://www.ucp.world"
                className="text-[#f8a2e1] hover:underline"
                target="_blank"
              >
                GTA World
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalentContract;
