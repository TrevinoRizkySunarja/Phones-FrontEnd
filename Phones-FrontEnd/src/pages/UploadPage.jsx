// src/pages/UploadPage.jsx
import React, { useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import { uploadFile } from "../api/coolphones.js";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");
    const [result, setResult] = useState(null);

    async function onUpload(e) {
        e.preventDefault();
        if (!file) return;

        setBusy(true);
        setErr("");
        setResult(null);

        try {
            const res = await uploadFile(file);
            // verwacht bv: { url: "http://.../uploads/xxx.png" }
            setResult(res);
        } catch (e2) {
            setErr(e2.message || "Upload failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <PageShell title="Upload" subtitle="File upload via POST /upload (multipart/form-data)">
            {err && (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {err}
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 max-w-xl">
                <form onSubmit={onUpload} className="space-y-4">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm"
                    />

                    <button
                        disabled={busy || !file}
                        className="w-full rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60 transition"
                    >
                        {busy ? "Uploading..." : "Upload"}
                    </button>
                </form>

                {result && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                        <div className="font-semibold">Upload result</div>
                        <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
            </div>
        </PageShell>
    );
}
