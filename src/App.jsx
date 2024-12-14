import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullPageLayout from "./components/FullPageLayout";
import ContactPage from "./components/ContactPage";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
import PageTransition from "./components/PageTransition";
import FAQ from "./components/FAQ";
import TalentContract from "./components/TalentContract";

function App() {
  return (
    <div>
      <PageTransition />
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<FullPageLayout />} />
            <Route path="/book" element={<ContactPage />} />
            <Route path="/book" element={<FAQ />} />
            <Route path="/contract" element={<TalentContract />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
