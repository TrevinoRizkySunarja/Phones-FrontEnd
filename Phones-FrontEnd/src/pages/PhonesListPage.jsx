// src/pages/PhonesListPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import PhoneCard from "../components/PhoneCard.jsx";
import Modal from "../components/Modal.jsx";
import { deletePhone, listPhones, patchPhone } from "../api/coolphones.js";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function PhonesListPage() {
    const nav = useNavigate();
    const location = useLocation();
    const [params, setParams] = useSearchParams();

    const [data, setData] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // Filters (2 stuks): q + brand
    const q = params.get("q") || "";
    const brand = params.get("brand") || "";

    // Pagination (front-end) -> X items zichtbaar
    const limit = Math.max(parseInt(params.get("limit") || "6", 10), 1);
    const page = Math.max(parseInt(params.get("page") || "1", 10), 1);

    const isDeleteModal = location.pathname.endsWith("/delete");

    async function load() {
        setLoading(true);
        setErr("");
        try {
            const res = await listPhones({ q, brand });
            setData(res);
        } catch (e) {
            setErr(e.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, brand]);

    const itemsAll = data?.items || [];

    const totalItems = itemsAll.length;
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
    const safePage = Math.min(page, totalPages);

    const itemsPage = useMemo(() => {
        const start = (safePage - 1) * limit;
        const end = start + limit;
        return itemsAll.slice(start, end);
    }, [itemsAll, safePage, limit]);

    function applyFilters(e) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const next = {};
        const nextQ = (fd.get("q") || "").toString().trim();
        const nextBrand = (fd.get("brand") || "").toString().trim();
        const nextLimit = (fd.get("limit") || "6").toString();

        if (nextQ) next.q = nextQ;
        if (nextBrand) next.brand = nextBrand;
        next.limit = nextLimit;
        next.page = "1";
        setParams(next);
    }

    function resetFilters() {
        setParams({ limit: "6", page: "1" });
    }

    function goPage(p) {
        const next = new URLSearchParams(params);
        next.set("page", String(p));
        setParams(next);
    }

    async function onToggleBookmark(phone) {
        // Extra onderdeel: PATCH update vanuit de lijst (hasBookmark)
        try {
            await patchPhone(phone.id, { hasBookmark: !phone.hasBookmark });
            await load();
        } catch (e) {
            setErr(e.message || "Failed to update");
        }
    }

    function openDeleteModal(id) {
        nav(`/phones/${id}/delete${location.search}`);
    }

    async function confirmDelete(id) {
        try {
            await deletePhone(id);
            nav(`/phones${location.search}`);
            await load();
        } catch (e) {
            setErr(e.message || "Failed to delete");
        }
    }

    return (
        <PageShell
            title="CoolPhones Collection"
            subtitle="Overzicht (niet alle detailvelden). Filters: q + brand. Bookmark via PATCH vanuit de lijst."
        >
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
                <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-4">
                        <input
                            name="q"
                            defaultValue={q}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="Search q (e.g. iphone)"
                        />
                    </div>

                    <div className="md:col-span-3">
                        <input
                            name="brand"
                            defaultValue={brand}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="Brand (e.g. Apple)"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <select
                            name="limit"
                            defaultValue={String(limit)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            <option value="4">limit=4</option>
                            <option value="6">limit=6</option>
                            <option value="8">limit=8</option>
                            <option value="12">limit=12</option>
                        </select>
                    </div>

                    <div className="md:col-span-3 flex gap-2">
                        <button className="flex-1 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 transition">
                            Apply
                        </button>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="flex-1 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200 transition"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="text-sm text-slate-600">
                        Showing <span className="font-semibold text-slate-900">{itemsPage.length}</span> of{" "}
                        <span className="font-semibold text-slate-900">{totalItems}</span> items
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => goPage(Math.max(safePage - 1, 1))}
                            disabled={safePage <= 1}
                            className="px-3 py-2 rounded-xl text-sm bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition"
                        >
                            Prev
                        </button>

                        <div className="text-sm text-slate-700">
                            page <span className="font-semibold">{safePage}</span> /{" "}
                            <span className="font-semibold">{totalPages}</span>
                        </div>

                        <button
                            onClick={() => goPage(Math.min(safePage + 1, totalPages))}
                            disabled={safePage >= totalPages}
                            className="px-3 py-2 rounded-xl text-sm bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition"
                        >
                            Next
                        </button>

                        <Link
                            to="/phones/create"
                            className="ml-2 px-3 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition"
                        >
                            + Create
                        </Link>
                    </div>
                </div>
            </div>

            {err && (
                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {err}
                </div>
            )}

            <div className="mt-6">
                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                        Loading...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {itemsPage.map((p) => (
                            <PhoneCard
                                key={p.id}
                                phone={p}
                                onToggleBookmark={onToggleBookmark}
                                onDelete={(phone) => openDeleteModal(phone.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {isDeleteModal && (
                <DeleteModal
                    items={itemsAll}
                    onCancel={() => nav(`/phones${location.search}`)}
                    onConfirm={confirmDelete}
                />
            )}
        </PageShell>
    );
}

function DeleteModal({ items, onCancel, onConfirm }) {
    // route: /phones/:id/delete
    const id = window.location.pathname.split("/")[2];
    const phone = items.find((x) => x.id === id);

    return (
        <Modal title="Delete phone?" closeTo="/phones">
            <div className="space-y-3">
                <div className="text-sm text-slate-700">
                    {phone ? (
                        <>
                            Delete <span className="font-semibold">{phone.title}</span> ({phone.brand})?
                        </>
                    ) : (
                        <>Item not found.</>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(id)}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition"
                        disabled={!phone}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}
