import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

function NavItem({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "px-3 py-2 rounded-lg text-sm font-medium transition",
                    isActive
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}

export default function Layout() {
    const { token, logout, isLoggedIn } = useAuth();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto max-w-6xl px-4">
                <header className="py-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-xl font-semibold tracking-tight">CoolPhones</div>
                            <div className="text-xs text-zinc-400">Front-end (React + REST API)</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden md:flex items-center gap-1 rounded-xl bg-zinc-900/60 p-1">
                                <NavItem to="/phones">Collection</NavItem>
                                <NavItem to="/phones/create">Create</NavItem>
                                <NavItem to="/upload">Upload</NavItem>
                                <NavItem to="/protected">Protected</NavItem>
                                <NavItem to="/about">About</NavItem>
                                <NavItem to="/login">Login</NavItem>
                            </div>

                            <div className="text-xs text-zinc-300">
                                JWT:{" "}
                                <span className={isLoggedIn ? "text-emerald-400" : "text-zinc-400"}>
                  {isLoggedIn ? "present" : "none"}
                </span>
                            </div>

                            {token ? (
                                <button
                                    onClick={logout}
                                    className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
                                >
                                    Logout
                                </button>
                            ) : null}
                        </div>
                    </div>
                </header>

                <main className="pb-10">
                    <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-5">
                        <Outlet />
                    </div>
                </main>

                <footer className="pb-10 text-xs text-zinc-500">
                    CoolPhones — React + Tailwind + REST API
                </footer>
            </div>
        </div>
    );
}
