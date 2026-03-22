import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function RootLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />

            <main className="mx-auto w-full max-w-6xl px-4 py-8">
                <TransitionGroup component={null}>
                    <CSSTransition key={location.pathname} classNames="route" timeout={250}>
                        <div>
                            <Outlet />
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </main>

            <footer className="border-t border-zinc-800">
                <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-400">
                    CoolPhones — React + Tailwind + REST API
                </div>
            </footer>
        </div>
    );
}
