import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <div className="text-xs text-white/40">404</div>
            <div className="text-white text-3xl font-semibold mt-2">Page not found</div>
            <div className="text-white/60 mt-2">
                De URL bestaat niet, of de detailpagina kon niet worden gevonden.
            </div>
            <Link
                to="/"
                className="inline-block mt-5 text-indigo-300 hover:text-indigo-200"
            >
                Back to collection
            </Link>
        </div>
    );
}
