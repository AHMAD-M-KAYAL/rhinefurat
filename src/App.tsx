// src/App.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";

// Lazy Loading الصفحات
const ContactFormPage = lazy(() => import("./pages/ContactFormPage"));
const HireDeveloperPage = lazy(() => import("./pages/HireDeveloperPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TechDetailPage = lazy(() => import("./pages/TechDetailPage"));
const ITRecruitmentPage = lazy(() => import("./pages/ITRecruitmentPage"));
const NearshorePage = lazy(() => import("./pages/NearshorePage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<ContactPage />} />
          <Route path="/contactform" element={<ContactFormPage />} />
          <Route path="/hiredeveloper" element={<HireDeveloperPage />} />
          <Route path="/techdetail" element={<TechDetailPage />} />
          <Route path="/itrecruitment" element={<ITRecruitmentPage />} />
          <Route path="/nearshore" element={<NearshorePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
