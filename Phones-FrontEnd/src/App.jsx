import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Navbar from "./components/Navbar.jsx";
import PhonesListPage from "./pages/PhonesListPage.jsx";
import PhoneDetailPage from "./pages/PhoneDetailPage.jsx";
import PhoneCreatePage from "./pages/PhoneCreatePage.jsx";
import PhoneEditPage from "./pages/PhoneEditPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ProtectedPage from "./pages/ProtectedPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Modal from "./components/Modal.jsx";

function Shell() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-8">
                <TransitionGroup component={null}>
                    <CSSTransition key={location.pathname} classNames="page" timeout={180}>
                        <div>
                            <Outlet />
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
}

// Modal wrapper route content
function PhoneDetailModalRoute() {
    const nav = useNavigate();
    return (
        <Modal title="Phone detail" onClose={() => nav(-1)}>
            <PhoneDetailPage />
        </Modal>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Shell />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <PhonesListPage /> },
            { path: "phones/create", element: <PhoneCreatePage /> },
            { path: "phones/:id", element: <PhoneDetailPage /> },
            { path: "phones/:id/edit", element: <PhoneEditPage /> },

            // Modal detail via router (open from list with state.backgroundLocation)
            { path: "phones/:id/modal", element: <PhoneDetailModalRoute /> },

            { path: "login", element: <LoginPage /> },
            { path: "upload", element: <UploadPage /> },
            { path: "protected", element: <ProtectedPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
