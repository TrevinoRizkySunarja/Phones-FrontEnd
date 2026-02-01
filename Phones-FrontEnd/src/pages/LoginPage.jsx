// src/pages/LoginPage.jsx
import React, { useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import { loginBasic } from "../api/coolphones.js";
import { setToken } from "../api/http.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const nav = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/phones";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setErr("");
        try {
            const res = await loginBasic(username, password);
            // verwacht { token: "..." } of "token" key
            const token = res?.token || res?.jwt || res?.access_token;
            if (!token) throw new Error("No token returned by /login");
            setToken(token);
            nav(from);
        } catch (e2) {
            setErr(e2.message || "Login failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <PageShell title="Login" subtitle="Gebruik /login (Basic Authorization) -> JWT in localStorage">
            {location.state?.expired && (
                <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Token expired. Login again.
                </div>
            )}

            {err && (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {err}
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 max-w-xl">
                <form onSubmit={onSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Username</span>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Password</span>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </label>

                    <button
                        disabled={busy}
                        className="w-full rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60 transition"
                    >
                        {busy ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </PageShell>
    );
}
