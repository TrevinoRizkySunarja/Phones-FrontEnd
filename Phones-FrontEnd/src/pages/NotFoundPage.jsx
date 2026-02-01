// src/pages/NotFoundPage.jsx
import React from "react";
import PageShell from "../layout/PageShell.jsx";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <PageShell title="404" subtitle="Page not found">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="text-sm text-slate-700">
                    The URL does not exist.
                </div>
                <div className="mt-4">
                    <Link
                        to="/phones"
                        className="inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
                    >
                        Go to collection
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
