import React, { useState } from "react";
import { useNavigate } from "react-router";
import PhoneForm from "../components/PhoneForm.jsx";
import { usePhones } from "../context/PhonesContext.jsx";

export default function PhoneCreatePage() {
    const { createOne } = usePhones();
    const nav = useNavigate();
    const [err, setErr] = useState("");

    async function onSubmit(payload) {
        setErr("");
        try {
            const created = await createOne(payload);
            nav(`/phones/${created.id}`);
        } catch (e) {
            setErr(e.message || "Create failed");
        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div>
                <h1 className="text-white text-2xl font-semibold">Create phone</h1>
                <p className="text-white/60 text-sm mt-1">POST /phones</p>
            </div>

            {err ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {err}
                </div>
            ) : null}

            <PhoneForm onSubmit={onSubmit} submitLabel="Create" />
        </div>
    );
}
