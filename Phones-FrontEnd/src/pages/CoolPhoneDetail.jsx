// src/pages/CoolPhoneDetail.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPhone } from "../api/coolphonesApi.js";

export default function CoolPhoneDetail() {
    const { id } = useParams();
    const [phone, setPhone] = useState(null);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    async function load() {
        setError("");

        const key = `coolphones_lastmod_${id}`;
        const last = localStorage.getItem(key) || "";

        try {
            const result = await getPhone(id, { ifModifiedSince: last });
            setStatus(String(result.status));

            if (result.status === 304) {
                // If 304, keep current phone in state (no new body)
                return;
            }

            setPhone(result.phone);

            if (result.lastModified) {
                localStorage.setItem(key, result.lastModified);
            }
        } catch (e) {
            setError(e.message || "Failed to load detail");
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold">Detail</h2>
                <div className="flex gap-2">
                    <button className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700" onClick={load}>
                        Reload
                    </button>
                    <Link className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700" to="/phones">
                        Back
                    </Link>
                </div>
            </div>

            <div className="text-xs text-slate-300">HTTP status: {status}</div>

            {error ? <div className="rounded bg-red-900/40 p-3 text-sm">{error}</div> : null}

            {!phone ? (
                <div className="rounded border border-slate-800 bg-slate-900 p-4">No detail loaded</div>
            ) : (
                <div className="rounded border border-slate-800 bg-slate-900 p-4 space-y-2">
                    <div className="text-lg font-bold">{phone.title}</div>
                    <div className="text-sm text-slate-300">{phone.brand}</div>
                    <div className="text-sm">{phone.description}</div>

                    {phone.imageUrl ? (
                        <img className="mt-3 w-80 rounded border border-slate-800" src={phone.imageUrl} alt={phone.title} />
                    ) : null}

                    <pre className="mt-3 overflow-auto rounded bg-slate-950 p-3 text-xs">
            {JSON.stringify(phone, null, 2)}
          </pre>

                    <div className="flex gap-2">
                        <Link className="rounded bg-indigo-600 px-3 py-2 text-sm hover:bg-indigo-500" to={`/phones/${id}/edit`}>
                            Edit
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
