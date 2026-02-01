// src/layout/Layout.jsx
import React, { useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { clearToken, getToken } from "../api/coolphonesApi.js";

export default function Layout() {
    const nav = useNavigate();
    const token = getToken();

    const jwtInfo = useMemo(() => {
        if (!token) return { ok: false, expired: false, payload: null };

        try {
            const payload = jwtDecode(token);
            const exp = typeof payload?.exp === "number" ? payload.exp : null;
            const now = Math.floor(Date.now() / 1000);
            const expired = exp !== null ? exp <= now : false;
            return { ok: true, expired, payload };
        } catch {
            return { ok: false, expired: false, payload: null };
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <header className="flex flex-wrap items-center gap-4">
                    <Link to="/" className="text-2xl font-extrabold">
                        CoolPhones
                    </Link>

                    <nav className="flex flex-wrap gap-3 text-sm">
                        <Link className="hover:underline" to="/phones">Collection</Link>
                        <Link className="hover:underline" to="/phones/create">Create</Link>
                        <Link className="hover:underline" to="/upload">Upload</Link>
                        <Link className="hover:underline" to="/protected">Protected</Link>
                        <Link className="hover:underline" to="/about">About</Link>
                    </nav>

                    <div className="ml-auto flex items-center gap-3 text-sm">
                        {!token ? (
                            <Link className="rounded bg-indigo-600 px-3 py-1 font-semibold" to="/login">
                                Login
                            </Link>
                        ) : (
                            <button
                                className="rounded bg-red-600 px-3 py-1 font-semibold"
                                onClick={() => {
                                    clearToken();
                                    nav("/login");
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </header>

                <div className="mt-3 rounded border border-slate-800 bg-slate-900 p-3 text-xs">
                    <div>JWT present: {token ? "yes" : "no"}</div>
                    <div>JWT valid: {jwtInfo.ok ? "yes" : "no"}</div>
                    <div>JWT expired: {jwtInfo.expired ? "yes" : "no"}</div>
                </div>

                <main className="mt-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
