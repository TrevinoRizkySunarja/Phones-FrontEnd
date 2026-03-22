import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
    const { isAuthed, login } = useAuth();
    const nav = useNavigate();

    const [username, setUsername] = useState("user");
    const [password, setPassword] = useState("pass");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(e) {
        e.preventDefault();
        setErr("");
        setBusy(true);
        try {
            const ok = await login(username, password);
            if (ok) nav("/");
            else setErr("JWT invalid/expired.");
        } catch (e2) {
            setErr(e2.message || "Login failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 max-w-xl">
            <div>
                <h1 className="text-white text-2xl font-semibold">Login</h1>
                <p className="text-white/60 text-sm mt-1">POST /login (Basic Authorization → JWT)</p>
            </div>

            {isAuthed ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    You are already logged in.
                </div>
            ) : null}

            {err ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {err}
                </div>
            ) : null}

            <form onSubmit={submit} className="space-y-3">
                <label className="block">
                    <div className="text-xs text-white/60 mb-1">Username</div>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-white outline-none focus:border-white/20"
                    />
                </label>

                <label className="block">
                    <div className="text-xs text-white/60 mb-1">Password</div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-white outline-none focus:border-white/20"
                    />
                </label>

                <button
                    disabled={busy}
                    className="w-full rounded-xl bg-white text-zinc-950 font-semibold py-2.5 hover:bg-white/90 transition disabled:opacity-60"
                >
                    {busy ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
