// src/components/Protected.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../api/http.js";
import { isJwtExpired } from "../api/jwt.js";

export default function Protected({ children }) {
    const token = getToken();
    const location = useLocation();

    if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    if (isJwtExpired(token)) return <Navigate to="/login" replace state={{ from: location.pathname, expired: true }} />;

    return children;
}
