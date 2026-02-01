// src/pages/CoolPhonesOverview.jsx
import React, { useEffect, useState } from "react";
import PhoneCard from "../components/PhoneCard.jsx";
import { getPhones } from "../api/coolphonesApi.js";

export default function CoolPhonesOverview() {
    const [phones, setPhones] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [error, setError] = useState("");

    const [q, setQ] = useState("");
    const [brand, setBrand] = useState("");

    // Optional pagination controls
    const [limit, setLimit] = useState("6");
    const [page, setPage] = useState("1");

    async function load() {
        setError("");
        try {
            const data = await getPhones({
                q: q.trim(),
                brand: brand.trim(),
                page: limit ? page : "",
                limit: limit || "",
            });

            setPhones(Array.isArray(data.items) ? data.items : []);
            setPagination(data.pagination || null);
        } catch (e) {
            setError(e.message || "Failed to load");
            setPhones([]);
            setPagination(null);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-extrabold">Phones</h2>
                <p className="text-sm text-slate-300">
                    Backend: <span className="font-mono">http://145.24.237.21:8001</span>
                </p>
            </div>

            <form
                className="grid gap-3 rounded border border-slate-800 bg-slate-900 p-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    setPage("1");
                    load();
                }}
            >
                <div className="grid gap-2 md:grid-cols-3">
                    <input
                        className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                        placeholder="Search q (e.g. iphone)"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <input
                        className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                        placeholder="Brand (e.g. Apple)"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <select
                        className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                        value={limit}
                        onChange={(e) => {
                            setLimit(e.target.value);
                            setPage("1");
                        }}
                    >
                        <option value="">No limit (no pagination)</option>
                        <option value="3">limit=3</option>
                        <option value="6">limit=6</option>
                        <option value="10">limit=10</option>
                    </select>
                </div>

                {limit ? (
                    <div className="flex items-center gap-2">
                        <input
                            className="w-24 rounded bg-slate-950 p-2 text-center outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                            value={page}
                            onChange={(e) => setPage(e.target.value)}
                            placeholder="page"
                        />
                        <button
                            type="button"
                            className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                            onClick={() => {
                                const p = Math.max(parseInt(page || "1", 10) - 1, 1);
                                setPage(String(p));
                            }}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                            onClick={() => {
                                const p = Math.max(parseInt(page || "1", 10) + 1, 1);
                                setPage(String(p));
                            }}
                        >
                            Next
                        </button>
                    </div>
                ) : null}

                <div className="flex gap-2">
                    <button className="rounded bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500" type="submit">
                        Apply
                    </button>
                    <button
                        className="rounded bg-slate-800 px-4 py-2 font-semibold hover:bg-slate-700"
                        type="button"
                        onClick={() => {
                            setQ("");
                            setBrand("");
                            setLimit("6");
                            setPage("1");
                            setTimeout(load, 0);
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>

            {pagination ? (
                <div className="text-xs text-slate-300">
                    page {pagination.currentPage} / {pagination.totalPages} | totalItems {pagination.totalItems}
                </div>
            ) : null}

            {error ? <div className="rounded bg-red-900/40 p-3 text-sm">{error}</div> : null}

            <ul className="grid gap-3">
                {phones.map((p) => (
                    <PhoneCard key={p.id} phone={p} />
                ))}
            </ul>
        </div>
    );
}
