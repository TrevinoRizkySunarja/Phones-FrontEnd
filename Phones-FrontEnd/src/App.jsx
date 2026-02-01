// src/App.jsx
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import PhonesListPage from "./pages/PhonesListPage.jsx";
import PhoneDetailPage from "./pages/PhoneDetailPage.jsx";
import PhoneCreatePage from "./pages/PhoneCreatePage.jsx";
import PhoneEditPage from "./pages/PhoneEditPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedPage from "./pages/ProtectedPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function App() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <TransitionGroup component={null}>
                <CSSTransition key={location.pathname} classNames="page" timeout={180}>
                    <main>
                        <Routes location={location}>
                            <Route path="/" element={<Navigate to="/phones" replace />} />

                            <Route path="/phones" element={<PhonesListPage />} />
                            <Route path="/phones/:id" element={<PhoneDetailPage />} />
                            <Route path="/phones/create" element={<PhoneCreatePage />} />
                            <Route path="/phones/:id/edit" element={<PhoneEditPage />} />

                            {/* Routable modal (delete) via PhonesListPage */}
                            <Route path="/phones/:id/delete" element={<PhonesListPage />} />

                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/protected" element={<ProtectedPage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/about" element={<AboutPage />} />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </CSSTransition>
            </TransitionGroup>

            <footer className="mt-10 border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
                    CoolPhones — React + Tailwind + REST API
                </div>
            </footer>
        </div>
    );
}
