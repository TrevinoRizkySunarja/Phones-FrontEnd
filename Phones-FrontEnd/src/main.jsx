import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { PhonesProvider } from "./context/PhonesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <PhonesProvider>
                <App />
            </PhonesProvider>
        </AuthProvider>
    </React.StrictMode>
);
