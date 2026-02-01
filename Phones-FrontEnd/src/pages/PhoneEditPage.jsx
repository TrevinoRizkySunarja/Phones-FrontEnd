// src/pages/PhoneEditPage.jsx
import React, { useEffect, useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import PhoneForm from "../components/PhoneForm.jsx";
import { getPhone, updatePhonePut } from "../api/coolphones.js";
import { useNavigate, useParams } from "react-router-dom";

export default function PhoneEditPage() {
    const { id } = useParams();
    const nav = useNavigate();
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setErr("");
            try {
                const data = await getPhone(id);
                if (mounted) setPhone(data);
            } catch (e) {
                if (mounted) setErr(e.status === 404 ? "Not found (404)" : (e.message || "Failed"));
            }
        }
        load();
        return () => { mounted = false; };
    }, [id]);

    async function onSubmit(payload) {
        setBusy(true);
        setErr("");
        try {
            const updated = await updatePhonePut(id, payload);
            nav(`/phones/${updated.id}`);
        } catch (e) {
            setErr(e.message || "Failed to update");
        } finally {
            setBusy(false);
        }
    }

    return (
        <PageShell title="Edit CoolPhone" subtitle="Bewerken via formulier met ingevulde waarden (PUT /phones/:id)">
            {err && (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {err}
                </div>
            )}

            {!phone ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                    Loading...
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                    <PhoneForm initialValues={phone} onSubmit={onSubmit} submitLabel="Save changes" busy={busy} />
                </div>
            )}
        </PageShell>
    );
}
