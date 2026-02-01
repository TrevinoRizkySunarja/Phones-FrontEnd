// src/pages/CoolPhoneEdit.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePhone, getPhone, patchPhone, patchPhonePostOverload, putPhone, uploadFile } from "../api/coolphonesApi.js";

export default function CoolPhoneEdit() {
    const { id } = useParams();
    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function load() {
        setError("");
        try {
            const r = await getPhone(id);
            if (r.phone) {
                setTitle(r.phone.title || "");
                setBrand(r.phone.brand || "");
                setDescription(r.phone.description || "");
            }
        } catch (e) {
            setError(e.message || "Load failed");
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function doPut() {
        setError("");
        if (!title.trim() || !brand.trim() || !description.trim()) {
            setError("PUT requires title, brand, description");
            return;
        }
        setBusy(true);
        try {
            await putPhone(id, { title, brand, description });
            nav(`/phones/${id}`);
        } catch (e) {
            setError(e.message || "PUT failed");
        } finally {
            setBusy(false);
        }
    }

    async function doPatchTitle() {
        setError("");
        setBusy(true);
        try {
            await patchPhone(id, { title });
            nav(`/phones/${id}`);
        } catch (e) {
            setError(e.message || "PATCH failed");
        } finally {
            setBusy(false);
        }
    }

    async function doPostOverloadPatchTitle() {
        setError("");
        setBusy(true);
        try {
            await patchPhonePostOverload(id, { title });
            nav(`/phones/${id}`);
        } catch (e) {
            setError(e.message || "POST overload failed");
        } finally {
            setBusy(false);
        }
    }

    async function doDelete() {
        setError("");
        setBusy(true);
        try {
            await deletePhone(id);
            nav("/phones");
        } catch (e) {
            setError(e.message || "DELETE failed");
        } finally {
            setBusy(false);
        }
    }

    async function doUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");
        setBusy(true);
        try {
            const imageUrl = await uploadFile(file);
            await patchPhone(id, { imageUrl });
            nav(`/phones/${id}`);
        } catch (e) {
            setError(e.message || "Upload failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold">Edit</h2>
                <Link className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700" to={`/phones/${id}`}>
                    Back to detail
                </Link>
            </div>

            {error ? <div className="rounded bg-red-900/40 p-3 text-sm">{error}</div> : null}

            <div className="rounded border border-slate-800 bg-slate-900 p-4 space-y-3">
                <div className="text-sm font-semibold">Upload image</div>
                <input disabled={busy} type="file" accept="image/*" onChange={doUpload} />
            </div>

            <div className="grid gap-3 max-w-xl">
                <input
                    className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                    placeholder="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <textarea
                    className="rounded bg-slate-950 p-2 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                    placeholder="description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex flex-wrap gap-2">
                    <button disabled={busy} className="rounded bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500" onClick={doPut}>
                        Save (PUT)
                    </button>

                    <button disabled={busy} className="rounded bg-slate-800 px-4 py-2 font-semibold hover:bg-slate-700" onClick={doPatchTitle}>
                        PATCH title
                    </button>

                    <button disabled={busy} className="rounded bg-slate-800 px-4 py-2 font-semibold hover:bg-slate-700" onClick={doPostOverloadPatchTitle}>
                        POST overload → PATCH title
                    </button>

                    <button disabled={busy} className="rounded bg-red-600 px-4 py-2 font-semibold hover:bg-red-500" onClick={doDelete}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}
