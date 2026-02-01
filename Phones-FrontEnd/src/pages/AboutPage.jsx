// src/pages/AboutPage.jsx
import React from "react";
import PageShell from "../layout/PageShell.jsx";
import { getBaseUrl } from "../api/http.js";

export default function AboutPage() {
    return (
        <PageShell title="About CoolPhones" subtitle="React + REST API">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 text-sm text-slate-700 space-y-2">
                <div>Backend base URL: <span className="font-semibold">{getBaseUrl()}</span></div>
                <div>Collection: <span className="font-semibold">/phones</span></div>
                <div>Detail: <span className="font-semibold">/phones/:id</span></div>
                <div>Login (JWT): <span className="font-semibold">/login</span></div>
                <div>Protected: <span className="font-semibold">/protected/ping</span></div>
                <div>Upload: <span className="font-semibold">/upload</span></div>
            </div>
        </PageShell>
    );
}
