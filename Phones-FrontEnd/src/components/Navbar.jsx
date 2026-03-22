import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function navClass({ isActive }) {
    return [
        "px-3 py-2 rounded-lg text-sm transition",
        isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5",
    ].join(" ");
}

export default function Navbar() {
    const { isAuthed, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                    <div>
                        <div className="text-white font-semibold leading-tight">CoolPhones</div>
                        <div className="text-xs text-white/50 leading-tight">React + Tailwind + REST API</div>
                    </div>
                </div>

                <nav className="flex items-center gap-1">
                    <NavLink to="/" className={navClass} end>
                        Collection
                    </NavLink>
                    <NavLink to="/phones/create" className={navClass}>
                        Create
                    </NavLink>
                    <NavLink to="/upload" className={navClass}>
                        Upload
                    </NavLink>
                    <NavLink to="/protected" className={navClass}>
                        Protected
                    </NavLink>
                    <NavLink to="/about" className={navClass}>
                        About
                    </NavLink>
                    <NavLink to="/login" className={navClass}>
                        Login
                    </NavLink>

                    {isAuthed ? (
                        <button
                            onClick={logout}
                            className="ml-2 px-3 py-2 rounded-lg text-sm bg-white/10 text-white hover:bg-white/15 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <span className="ml-2 text-xs text-white/50">JWT: none</span>
                    )}
                </nav>
            </div>
        </header>
    );
}
