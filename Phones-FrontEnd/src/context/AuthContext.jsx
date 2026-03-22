import React, { createContext, useContext, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginBasic } from "../api/auth.js";

const AuthContext = createContext(null);

function readTokenInfo(token) {
    if (!token) return { token: "", decoded: null, isAuthed: false };
    try {
        const decoded = jwtDecode(token);
        // exp is seconds
        const expMs = decoded?.exp ? decoded.exp * 1000 : 0;
        const isExpired = expMs ? Date.now() >= expMs : false;
        return { token, decoded, isAuthed: !isExpired };
    } catch {
        return { token: "", decoded: null, isAuthed: false };
    }
}

export function AuthProvider({ children }) {
    const initialToken = localStorage.getItem("coolphones_jwt") || "";
    const initial = readTokenInfo(initialToken);

    const [token, setToken] = useState(initial.token);
    const [decoded, setDecoded] = useState(initial.decoded);
    const [isAuthed, setIsAuthed] = useState(initial.isAuthed);

    async function login(username, password) {
        const { data } = await loginBasic(username, password);

        // backend kan { token: "..." } of { jwt: "..." } teruggeven
        const nextToken = data?.token || data?.jwt || data?.access_token || "";
        const next = readTokenInfo(nextToken);

        localStorage.setItem("coolphones_jwt", next.token);
        setToken(next.token);
        setDecoded(next.decoded);
        setIsAuthed(next.isAuthed);

        return next.isAuthed;
    }

    function logout() {
        localStorage.removeItem("coolphones_jwt");
        setToken("");
        setDecoded(null);
        setIsAuthed(false);
    }

    const value = useMemo(
        () => ({ token, decoded, isAuthed, login, logout }),
        [token, decoded, isAuthed]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
