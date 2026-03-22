import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App.jsx";

export default function RequireAuth({ children }) {
    const { isAuthed } = useContext(AuthContext);
    const loc = useLocation();

    if (!isAuthed) {
        return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
    }
    return children;
}
