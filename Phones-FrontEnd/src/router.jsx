import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout/layout.jsx";

import PhonesListPage from "./pages/PhonesListPage.jsx";
import PhoneDetailPage from "./pages/PhoneDetailPage.jsx";
import PhoneCreatePage from "./pages/PhoneCreatePage.jsx";
import PhoneEditPage from "./pages/PhoneEditPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ProtectedPage from "./pages/ProtectedPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <PhonesListPage /> },

            { path: "phones", element: <PhonesListPage /> },
            { path: "phones/create", element: <ProtectedRoute><PhoneCreatePage /></ProtectedRoute> },
            { path: "phones/:id", element: <PhoneDetailPage /> },
            { path: "phones/:id/edit", element: <ProtectedRoute><PhoneEditPage /></ProtectedRoute> },

            { path: "upload", element: <ProtectedRoute><UploadPage /></ProtectedRoute> },
            { path: "protected", element: <ProtectedRoute><ProtectedPage /></ProtectedRoute> },

            { path: "login", element: <LoginPage /> },
            { path: "about", element: <AboutPage /> },

            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
