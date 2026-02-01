// src/pages/ProtectedPage.jsx
import React, { useEffect, useState } from "react";
import PageShell from "../layout/PageShell.jsx";
import { protectedPing } from "../api/coolphones.js";
import Protected from "../components/Protected.jsx";

export default function ProtectedPage() {
    return (
        <Protected>
            <ProtectedInner />
        </Protected>
    );
}

function ProtectedInner() {
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => {
        let mounted = true;
        async function run() {
            setErr("");
            try {
                const res = await protectedPing();
                if (mounted) setMsg(JSON.stringify(res));
            } catch (e) {
                if (mounted) setErr(e.message || "Protected request failed");
            }
        }
        run();
        return () => { mounted = false; };
    }, []);

    return (
        <PageShell title="Protected" subtitle="Endpoint beveiligen met JWT (niet collectie/detail)">
            {err ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
                    {err}
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 text-sm text-slate-700">
                    {msg || "Loading..."}
                </div>
            )}
        </PageShell>
    );
}
