import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { usePhones } from "../context/PhonesContext.jsx";
import PhoneCard from "../components/PhoneCard.jsx";

export default function PhonesListPage() {
    const { items, pagination, loading, error, loadCollection, removeOne, toggleBookmark } = usePhones();
    const [searchParams, setSearchParams] = useSearchParams();

    const q = searchParams.get("q") || "";
    const brand = searchParams.get("brand") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const [draftQ, setDraftQ] = useState(q);
    const [draftBrand, setDraftBrand] = useState(brand);

    useEffect(() => {
        loadCollection({ q, brand, page, limit });
    }, [q, brand, page, limit]);

    const meta = useMemo(() => {
        const p = pagination;
        return {
            currentPage: p?.currentPage || page,
            totalPages: p?.totalPages || 1,
            totalItems: p?.totalItems ?? items.length,
            currentItems: p?.currentItems ?? items.length,
        };
    }, [pagination, page, items.length]);

    function applyFilters() {
        const next = new URLSearchParams(searchParams);
        if (draftQ.trim()) next.set("q", draftQ.trim());
        else next.delete("q");

        if (draftBrand.trim()) next.set("brand", draftBrand.trim());
        else next.delete("brand");

        next.set("page", "1");
        next.set("limit", String(limit));
        setSearchParams(next);
    }

    function resetFilters() {
        setDraftQ("");
        setDraftBrand("");
        setSearchParams(new URLSearchParams({ page: "1", limit: String(limit) }));
    }

    function setPage(nextPage) {
        const next = new URLSearchParams(searchParams);
        next.set("page", String(nextPage));
        next.set("limit", String(limit));
        setSearchParams(next);
    }

    async function handleDelete(id) {
        await removeOne(id);
        await loadCollection({ q, brand, page, limit });
    }

    async function handleBookmark(id, nextValue) {
        await toggleBookmark(id, nextValue);
        await loadCollection({ q, brand, page, limit });
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-white text-2xl font-semibold">CoolPhones Collection</h1>
                        <p className="text-sm text-white/60 mt-1">
                            Overzicht (niet alle detailvelden). Filters: q + brand. Bookmark via PATCH vanuit de lijst.
                        </p>
                    </div>

                    <Link
                        to="/phones/create"
                        className="inline-flex items-center justify-center rounded-xl bg-white text-zinc-950 font-semibold px-4 py-2.5 hover:bg-white/90 transition"
                    >
                        Create new
                    </Link>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <input
                        value={draftQ}
                        onChange={(e) => setDraftQ(e.target.value)}
                        className="rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-white outline-none focus:border-white/20"
                        placeholder="Search q (e.g. iphone)"
                    />
                    <input
                        value={draftBrand}
                        onChange={(e) => setDraftBrand(e.target.value)}
                        className="rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-white outline-none focus:border-white/20"
                        placeholder="Brand (e.g. Apple)"
                    />
                    <select
                        value={limit}
                        onChange={(e) => {
                            const next = new URLSearchParams(searchParams);
                            next.set("limit", e.target.value);
                            next.set("page", "1");
                            setSearchParams(next);
                        }}
                        className="rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 text-white outline-none focus:border-white/20"
                    >
                        <option value="6">limit=6</option>
                        <option value="8">limit=8</option>
                        <option value="12">limit=12</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={applyFilters}
                            className="flex-1 rounded-xl bg-white/10 border border-white/10 text-white px-4 py-2.5 hover:bg-white/15 transition"
                        >
                            Apply
                        </button>
                        <button
                            onClick={resetFilters}
                            className="rounded-xl bg-white/5 border border-white/10 text-white/80 px-4 py-2.5 hover:bg-white/10 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
                    <div>
                        Showing {meta.currentItems} items • total {meta.totalItems}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(Math.max(meta.currentPage - 1, 1))}
                            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition disabled:opacity-40"
                            disabled={meta.currentPage <= 1}
                        >
                            Prev
                        </button>
                        <div className="text-white/70">
                            Page {meta.currentPage} / {meta.totalPages}
                        </div>
                        <button
                            onClick={() => setPage(Math.min(meta.currentPage + 1, meta.totalPages))}
                            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition disabled:opacity-40"
                            disabled={meta.currentPage >= meta.totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-200">
                    {error}
                </div>
            ) : null}

            {loading ? (
                <div className="text-white/70">Loading...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {items.map((p) => (
                        <PhoneCard
                            key={p.id}
                            phone={p}
                            onBookmark={(nextValue) => handleBookmark(p.id, nextValue)}
                            onDelete={() => handleDelete(p.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
