import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { usePhones } from "../context/PhonesContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function PhoneDetailPage() {
    const { id } = useParams();
    const { loadDetail } = usePhones();
    const { isAuthed } = useAuth();

    const [phone, setPhone] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        let active = true;
        setErr("");
        setPhone(null);

        loadDetail(id)
            .then((d) => active && setPhone(d))
            .catch((e) => active && setErr(e.message || "Not found"));

        return () => {
            active = false;
        };
    }, [id]);

    if (err) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-white text-xl font-semibold">Item not found</div>
                <div className="text-white/60 mt-2">{err}</div>
                <Link to="/" className="inline-block mt-4 text-indigo-300 hover:text-indigo-200">
                    Back to collection
                </Link>
            </div>
        );
    }

    if (!phone) return <div className="text-white/70">Loading detail...</div>;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-white text-2xl font-semibold">{phone.title}</div>
                    <div className="text-white/60">{phone.brand}</div>
                </div>

                {isAuthed ? (
                    <Link
                        to={`/phones/${phone.id}/edit`}
                        className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/25 transition"
                    >
                        Edit
                    </Link>
                ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                    <div className="text-xs text-white/60">Description</div>
                    <div className="text-white mt-1 whitespace-pre-wrap">{phone.description}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                    <div className="text-xs text-white/60">Reviews</div>
                    <div className="text-white mt-1 whitespace-pre-wrap">{phone.reviews || "-"}</div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                <div className="text-xs text-white/60">Image</div>
                {phone.imageUrl ? (
                    <a
                        className="text-indigo-300 hover:text-indigo-200 break-all"
                        href={phone.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {phone.imageUrl}
                    </a>
                ) : (
                    <div className="text-white/60">-</div>
                )}
            </div>

            <Link to="/" className="inline-block text-indigo-300 hover:text-indigo-200">
                Back to collection
            </Link>
        </div>
    );
}
