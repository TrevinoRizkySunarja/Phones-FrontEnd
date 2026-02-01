// src/pages/Upload.jsx
import React, { useState } from "react";
import { uploadFile } from "../api/coolphonesApi.js";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    async function submit(e) {
        e.preventDefault();
        setError("");
        setImageUrl("");

        if (!file) {
            setError("Select a file first");
            return;
        }

        try {
            const url = await uploadFile(file);
            setImageUrl(url);
        } catch (e2) {
            setError(e2.message || "Upload failed");
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-extrabold">Upload</h2>

            {error ? <div className="rounded bg-red-900/40 p-3 text-sm">{error}</div> : null}

            <form className="rounded border border-slate-800 bg-slate-900 p-4 space-y-3" onSubmit={submit}>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <button className="rounded bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500" type="submit">
                    Upload
                </button>
            </form>

            {imageUrl ? (
                <div className="rounded border border-slate-800 bg-slate-900 p-4 space-y-3">
                    <div className="text-sm">Returned imageUrl:</div>
                    <div className="font-mono text-xs break-all">{imageUrl}</div>
                    <img className="w-80 rounded border border-slate-800" src={imageUrl} alt="uploaded" />
                </div>
            ) : null}
        </div>
    );
}
