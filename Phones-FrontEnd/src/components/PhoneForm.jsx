// src/components/PhoneForm.jsx
import React, { useMemo, useState } from "react";

export default function PhoneForm({
                                      initialValues,
                                      onSubmit,
                                      submitLabel = "Save",
                                      busy = false,
                                  }) {
    const init = useMemo(() => {
        return {
            title: initialValues?.title || "",
            brand: initialValues?.brand || "",
            description: initialValues?.description || "",
            reviews: initialValues?.reviews || "",
            imageUrl: initialValues?.imageUrl || "",
            hasBookmark: !!initialValues?.hasBookmark,
        };
    }, [initialValues]);

    const [form, setForm] = useState(init);
    const [error, setError] = useState("");

    function setField(k, v) {
        setForm((p) => ({ ...p, [k]: v }));
    }

    function validate() {
        // Basiseis backend: lege velden niet toegestaan voor required fields (strings)
        if (!form.title.trim()) return "title is required";
        if (!form.brand.trim()) return "brand is required";
        if (!form.description.trim()) return "description is required";
        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const msg = validate();
        if (msg) {
            setError(msg);
            return;
        }
        setError("");
        await onSubmit({
            title: form.title.trim(),
            brand: form.brand.trim(),
            description: form.description.trim(),
            reviews: form.reviews.trim() ? form.reviews.trim() : undefined,
            imageUrl: form.imageUrl.trim() ? form.imageUrl.trim() : undefined,
            hasBookmark: !!form.hasBookmark,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Title *</span>
                    <input
                        value={form.title}
                        onChange={(e) => setField("title", e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                        placeholder="e.g. iPhone 15 Pro"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Brand *</span>
                    <input
                        value={form.brand}
                        onChange={(e) => setField("brand", e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                        placeholder="e.g. Apple"
                    />
                </label>
            </div>

            <label className="block">
                <span className="text-sm font-medium text-slate-700">Description *</span>
                <textarea
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    className="mt-1 w-full min-h-[110px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="Short description..."
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium text-slate-700">Reviews (optional)</span>
                <textarea
                    value={form.reviews}
                    onChange={(e) => setField("reviews", e.target.value)}
                    className="mt-1 w-full min-h-[90px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="Optional reviews..."
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium text-slate-700">Image URL (optional)</span>
                <input
                    value={form.imageUrl}
                    onChange={(e) => setField("imageUrl", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="http://... or /uploads/..."
                />
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={form.hasBookmark}
                    onChange={(e) => setField("hasBookmark", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm text-slate-700">Bookmarked (hasBookmark)</span>
            </label>

            <div className="flex items-center justify-end gap-2">
                <button
                    type="submit"
                    disabled={busy}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-60 transition"
                >
                    {busy ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
