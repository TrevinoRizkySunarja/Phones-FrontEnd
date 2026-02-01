// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginBasic } from "../api/coolphonesApi.js";

export default function Login() {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(e) {
        e.preventDefault();
        setError("");

        try {
            await loginBasic(username, password);
            nav("/protected");
        } catch (e2) {
            setError(e2.message || "Login failed");
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-extrabold">Login</h2>

            {error ? <div className="rounded bg-red-900/40 p-3 text-sm">{error}</div> : null}

            <form className="grid gap-3 max-w-sm" onSubmit={submit}>
                <input
                    className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="rounded bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500" type="submit">
                    Login (Basic → JWT)
                </button>
            </form>
        </div>
    );
}
