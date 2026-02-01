// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, setToken } from "../api/http.js";
import { decodeJwt, isJwtExpired } from "../api/jwt.js";

function linkClass({ isActive }) {
    return [
        "px-3 py-2 rounded-lg text-sm font-medium transition",
        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-200",
    ].join(" ");
}

export default function Navbar() {
    const nav = useNavigate();
    const token = getToken();
    const decoded = token ? decodeJwt(token) : null;
    const expired = token ? isJwtExpired(token) : false;

    function logout() {
        setToken(null);
        nav("/login");
    }

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
                        CP
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-slate-900">CoolPhones</div>
                        <div className="text-xs text-slate-500">Front-end (React + REST API)</div>
                    </div>
                </div>

                <nav className="flex items-center gap-2">
                    <NavLink to="/phones" className={linkClass}>Collection</NavLink>
                    <NavLink to="/phones/create" className={linkClass}>Create</NavLink>
                    <NavLink to="/upload" className={linkClass}>Upload</NavLink>
                    <NavLink to="/protected" className={linkClass}>Protected</NavLink>
                    <NavLink to="/about" className={linkClass}>About</NavLink>
                    <NavLink to="/login" className={linkClass}>Login</NavLink>

                    <div className="ml-2 hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-500">
              JWT: {token ? (expired ? "expired" : "ok") : "none"}
            </span>
                        {token && (
                            <button
                                onClick={logout}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-900 transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </nav>

                <div className="md:hidden text-xs text-slate-500">
                    {token ? (expired ? "JWT expired" : "JWT ok") : "JWT none"}
                </div>
            </div>

            {token && decoded && (
                <div className="mx-auto max-w-6xl px-4 pb-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                        <span className="font-semibold">Token payload:</span>{" "}
                        {decoded.sub ? `sub=${decoded.sub}` : "sub=?"}{" "}
                        {decoded.exp ? `| exp=${decoded.exp}` : ""}
                    </div>
                </div>
            )}
        </header>
    );
}
