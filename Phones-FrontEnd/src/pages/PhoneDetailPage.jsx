// src/pages/PhoneDetailPage.jsx
import React, { useEffect, useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import { getPhone } from "../api/coolphones.js";
import { Link, useParams } from "react-router-dom";

export default function PhoneDetailPage() {
    const { id } = useParams();
    const [phone, setPhone] = useState(null);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setErr("");
            try {
                const data = await getPhone(id);
                if (mounted) setPhone(data);
            } catch (e) {
                if (mounted) setErr(e.status === 404 ? "Not found (404)" : (e.message || "Failed"));
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, [id]);

    return (
        <PageShell title="CoolPhones Detail" subtitle="Detailweergave via Router: /phones/:id">
            {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                    Loading...
                </div>
            ) : err ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    {err}
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-xl font-bold text-slate-900">{phone.title}</div>
                            <div className="text-sm text-slate-600">{phone.brand}</div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to={`/phones/${phone.id}/edit`}
                                className="px-3 py-2 rounded-xl text-sm font-medium bg-slate-100 hover:bg-slate-200 transition"
                            >
                                Edit
                            </Link>
                            <Link
                                to="/phones"
                                className="px-3 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition"
                            >
                                Back
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-3">
                            <div>
                                <div className="text-sm font-semibold text-slate-900">Description</div>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{phone.description}</p>
                            </div>

                            {phone.reviews && (
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">Reviews</div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{phone.reviews}</p>
                                </div>
                            )}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-sm font-semibold text-slate-900">Meta</div>
                            <div className="mt-2 text-sm text-slate-700 space-y-1">
                                <div>Bookmarked: <span className="font-semibold">{phone.hasBookmark ? "yes" : "no"}</span></div>
                                <div>Date: <span className="font-semibold">{phone.date || "-"}</span></div>
                                <div className="break-all">
                                    Image: <span className="font-semibold">{phone.imageUrl || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PageShell>
    );
}
