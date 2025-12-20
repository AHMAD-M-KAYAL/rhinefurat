import { useEffect } from "react";
import { Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TopNav from "./components/TopNav";
import HeroSection from "./components/HeroSection";
import LeadershipSection from "./components/LeadershipSection";
import HighlightsSection from "./components/HighlightsSection";
import LanguageStoriesSection from "./components/LanguageStoriesSection";
import HeadquartersSection from "./components/HeadquartersSection";
import SiteFooter from "./components/SiteFooter";
import BackButton from "./components/BackButton";
import PhotoSlider from "./components/PhotoSlider";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactFormPage from "./pages/ContactFormPage";
import HireDeveloperPage from "./pages/HireDeveloperPage";
import NearshorePage from "./pages/NearshorePage";
import ITRecruitmentPage from "./pages/ITRecruitmentPage";
import TechLogosSlider from "./components/TechLogosSlider";
import TechDetailPage from "./pages/TechDetailPage";
import { SUPPORTED_LANGUAGES, SupportedLanguage, getDirection } from "./i18n";




const FALLBACK_LANGUAGE: SupportedLanguage = "en";
const SUPPORTED_LANGUAGE_SET = new Set<SupportedLanguage>(SUPPORTED_LANGUAGES);

const resolveLanguage = (language: string | undefined): SupportedLanguage => {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  const normalized = language.toLowerCase();
  if (SUPPORTED_LANGUAGE_SET.has(normalized as SupportedLanguage)) {
    return normalized as SupportedLanguage;
  }

  const base = normalized.split("-")[0];
  if (SUPPORTED_LANGUAGE_SET.has(base as SupportedLanguage)) {
    return base as SupportedLanguage;
  }

  return FALLBACK_LANGUAGE;
};

function App() {
  const { i18n } = useTranslation();
  const language = resolveLanguage(i18n.language);
  const direction = getDirection(language);
  const isRTL = direction === "rtl";
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [direction, language]);

  const handleLanguageChange = (nextLanguage: SupportedLanguage) => {
    i18n.changeLanguage(nextLanguage);
  };

  useEffect(() => {
    if (location.hash === '#about') {
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <Box
      sx={{
        direction,
        textAlign: isRTL ? "right" : "left",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
      dir={direction}
    >
      <TopNav
        language={language}
        onLanguageChange={handleLanguageChange}
        isRTL={isRTL}
      />
      <BackButton isRTL={isRTL} />
      <Box component="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection isRTL={isRTL} />
                <PhotoSlider isRTL={isRTL} />
                <AboutSection isRTL={isRTL} />
                <TechLogosSlider isRTL={isRTL} />
                <TestimonialsSection isRTL={isRTL} />
                <LeadershipSection isRTL={isRTL} />
                <HighlightsSection isRTL={isRTL} />
                <HeadquartersSection isRTL={isRTL} />
              </>
            }
          />
          <Route path="/contact" element={<ContactFormPage isRTL={isRTL} />} />
          <Route
            path="/services/hire-developer"
            element={<HireDeveloperPage isRTL={isRTL} />}
          />
          <Route
            path="/services/nearshore"
            element={<NearshorePage isRTL={isRTL} />}
          />
          <Route
            path="/services/it-recruitment"
            element={<ITRecruitmentPage isRTL={isRTL} />}
          />
          <Route
            path="/tech/:slug"
            element={<TechDetailPage isRTL={isRTL} />}
          />
        </Routes>
      </Box>
      <SiteFooter isRTL={isRTL} />
    </Box>
  );
}

export default App;
