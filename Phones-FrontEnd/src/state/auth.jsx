import React, { createContext, useContext, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("coolphones_jwt") || "");

    function loginWithToken(newToken) {
        localStorage.setItem("coolphones_jwt", newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem("coolphones_jwt");
        setToken("");
    }

    const decoded = useMemo(() => {
        if (!token) return null;
        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    }, [token]);

    const isExpired = useMemo(() => {
        if (!decoded?.exp) return false;
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp <= now;
    }, [decoded]);

    const value = useMemo(
        () => ({
            token: token || "",
            decoded,
            isExpired,
            isLoggedIn: !!token && !isExpired,
            loginWithToken,
            logout,
        }),
        [token, decoded, isExpired]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
