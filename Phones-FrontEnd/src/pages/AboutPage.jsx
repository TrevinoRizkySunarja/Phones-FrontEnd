import React from "react";
import { buildApiBase } from "../api/client.js";

export default function AboutPage() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
            <div className="text-white text-2xl font-semibold">About</div>
            <div className="text-white/60 text-sm">
                CoolPhones front-end gebruikt de REST API van praktijkopdracht 1.
            </div>
            <div className="text-white/80 text-sm">Backend: {buildApiBase()}</div>
            <ul className="mt-3 list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Collection + detail routing</li>
                <li>Create / edit / delete (auth required)</li>
                <li>Filters: q + brand</li>
                <li>Pagination</li>
                <li>PATCH bookmark</li>
                <li>Modal detail route</li>
            </ul>
        </div>
    );
}
