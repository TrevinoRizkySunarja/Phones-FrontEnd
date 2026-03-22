import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { usePhones } from "../context/PhonesContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import PhoneForm from "../components/PhoneForm.jsx";

export default function PhoneEditPage() {
    const { id } = useParams();
    const nav = useNavigate();
    const { isAuthed } = useAuth();
    const { loadDetail, updateOne } = usePhones();

    const [initial, setInitial] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        let active = true;
        setErr("");
        setInitial(null);

        loadDetail(id)
            .then((d) => active && setInitial(d))
            .catch((e) => active && setErr(e.message || "Not found"));

        return () => {
            active = false;
        };
    }, [id]);

    if (!isAuthed) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-white text-xl font-semibold">Login required</div>
                <div className="text-white/60 mt-2">Je moet ingelogd zijn om te editen.</div>
                <Link to="/login" className="inline-block mt-4 text-indigo-300 hover:text-indigo-200">
                    Go to login
                </Link>
            </div>
        );
    }

    if (err) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-white text-xl font-semibold">Item not found</div>
                <div className="text-white/60 mt-2">{err}</div>
            </div>
        );
    }

    if (!initial) return <div className="text-white/70">Loading...</div>;

    async function onSubmit(payload) {
        setErr("");
        try {
            const updated = await updateOne(id, payload);
            nav(`/phones/${updated.id}`);
        } catch (e) {
            setErr(e.message || "Update failed");
        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div>
                <h1 className="text-white text-2xl font-semibold">Edit phone</h1>
                <p className="text-white/60 text-sm mt-1">PUT /phones/:id (form is prefilled)</p>
            </div>

            {err ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {err}
                </div>
            ) : null}

            <PhoneForm initialValues={initial} onSubmit={onSubmit} submitLabel="Save changes" />
        </div>
    );
}
