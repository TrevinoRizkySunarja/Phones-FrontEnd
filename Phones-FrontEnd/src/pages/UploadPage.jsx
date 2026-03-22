import React, { useState } from "react";
import { uploadFile } from "../api/upload.js";
import { buildApiBase } from "../api/client.js";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    async function doUpload() {
        setErr("");
        setResult(null);
        if (!file) {
            setErr("Choose a file first.");
            return;
        }
        setBusy(true);
        try {
            const { data } = await uploadFile(file);
            setResult(data);
        } catch (e) {
            setErr(e.message || "Upload failed");
        } finally {
            setBusy(false);
        }
    }

    const apiBase = buildApiBase();

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div>
                <h1 className="text-white text-2xl font-semibold">Upload</h1>
                <p className="text-white/60 text-sm mt-1">
                    POST /upload (multipart). Static files via: {apiBase}/uploads/...
                </p>
            </div>

            {err ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {err}
                </div>
            ) : null}

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-white/80 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:font-semibold file:text-zinc-950 hover:file:bg-white/90"
                />
                <button
                    onClick={doUpload}
                    disabled={busy}
                    className="rounded-xl bg-white text-zinc-950 font-semibold px-4 py-2.5 hover:bg-white/90 transition disabled:opacity-60"
                >
                    {busy ? "Uploading..." : "Upload"}
                </button>
            </div>

            {result ? (
                <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                    <div className="text-xs text-white/60">Result</div>
                    <pre className="text-white/80 text-sm mt-2 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
                </div>
            ) : null}
        </div>
    );
}
