// src/pages/PhoneCreatePage.jsx
import React, { useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import PhoneForm from "../components/PhoneForm.jsx";
import { createPhone } from "../api/coolphones.js";
import { useNavigate } from "react-router-dom";

export default function PhoneCreatePage() {
    const nav = useNavigate();
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    async function onSubmit(payload) {
        setBusy(true);
        setErr("");
        try {
            const created = await createPhone(payload);
            nav(`/phones/${created.id}`);
        } catch (e) {
            setErr(e.message || "Failed to create");
        } finally {
            setBusy(false);
        }
    }

    return (
        <PageShell title="Create CoolPhone" subtitle="Nieuwe items aanmaken via POST /phones">
            {err && (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {err}
                </div>
            )}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                <PhoneForm onSubmit={onSubmit} submitLabel="Create" busy={busy} />
            </div>
        </PageShell>
    );
}
