// src/layout/PageShell.jsx
import React from "react";

export default function PageShell({ title, subtitle, children }) {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}
