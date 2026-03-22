import React from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function PhoneCard({ phone, onBookmark, onDelete }) {
    const { isAuthed } = useAuth();
    const loc = useLocation();

    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="text-white font-semibold truncate">{phone.title}</div>
                    <div className="text-sm text-white/60 truncate">{phone.brand}</div>
                </div>

                <button
                    onClick={() => onBookmark?.(!phone.hasBookmark)}
                    className={[
                        "h-9 w-9 rounded-xl border border-white/10 grid place-items-center transition",
                        phone.hasBookmark ? "bg-amber-400/20 text-amber-200" : "bg-white/5 text-white/70",
                    ].join(" ")}
                    title="Toggle bookmark (PATCH)"
                >
                    ★
                </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
                <Link
                    to={`/phones/${phone.id}`}
                    state={{ backgroundLocation: loc }}
                    className="px-3 py-2 rounded-lg text-sm bg-white/10 text-white hover:bg-white/15 transition"
                >
                    Detail
                </Link>

                {isAuthed ? (
                    <>
                        <Link
                            to={`/phones/${phone.id}/edit`}
                            className="px-3 py-2 rounded-lg text-sm bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/25 transition"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => onDelete?.()}
                            className="px-3 py-2 rounded-lg text-sm bg-red-500/15 text-red-200 hover:bg-red-500/20 transition"
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <span className="text-xs text-white/50">Login required for edit/delete</span>
                )}
            </div>
        </div>
    );
}
