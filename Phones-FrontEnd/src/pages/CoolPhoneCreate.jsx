// src/pages/CoolPhoneCreate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPhone } from "../api/coolphonesApi.js";

export default function CoolPhoneCreate() {
    const nav = useNavigate();
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    async function submit(e) {
        e.preventDefault();
        setError("");

        if (!title.trim() || !brand.trim() || !description.trim()) {
            setError("title, brand, description are required");
            return;
        }

        try {
            const created = await createPhone({ title, brand, description });
            nav(`/phones/${created.id}`);
        } catch (e2) {
            setError(e2.message || "Create failed");
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-extrabold">Create phone</h2>

            {error ? <div className="rounded bg-red-900/40 p-3 text-sm">{error}</div> : null}

            <form className="grid gap-3 max-w-xl" onSubmit={submit}>
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
                <button className="rounded bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}
