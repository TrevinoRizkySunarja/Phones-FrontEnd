// src/components/PhoneCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PhoneCard({ phone, onToggleBookmark, onDelete }) {
    const bookmarked = !!phone.hasBookmark;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
            <div className="p-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                        {phone.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{phone.brand}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                            to={`/phones/${phone.id}`}
                            className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition"
                        >
                            Detail
                        </Link>

                        <Link
                            to={`/phones/${phone.id}/edit`}
                            className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 transition"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => onToggleBookmark(phone)}
                            className={[
                                "px-3 py-2 rounded-lg text-sm font-medium transition",
                                bookmarked
                                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200",
                            ].join(" ")}
                        >
                            {bookmarked ? "Bookmarked" : "Bookmark"}
                        </button>

                        <button
                            onClick={() => onDelete(phone)}
                            className="px-3 py-2 rounded-lg text-sm font-medium bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="shrink-0">
                    <div
                        className={[
                            "h-10 w-10 rounded-xl grid place-items-center text-xs font-bold",
                            bookmarked ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                        title="Local state from API (hasBookmark)"
                    >
                        {bookmarked ? "★" : "☆"}
                    </div>
                </div>
            </div>
        </div>
    );
}
