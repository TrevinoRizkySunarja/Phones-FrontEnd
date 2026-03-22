import React, { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";

export default function ProtectedPage() {
    const [status, setStatus] = useState("loading");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        apiFetch("/protected/ping", { method: "GET" })
            .then(({ data }) => {
                setStatus("ok");
                setMsg(typeof data === "object" ? JSON.stringify(data) : String(data));
            })
            .catch((e) => {
                setStatus("error");
                setMsg(e.message || "Unauthorized");
            });
    }, []);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <div className="text-white text-2xl font-semibold">Protected</div>
            <div className="text-white/60 text-sm">GET /protected/ping (requires Bearer JWT)</div>

            <div
                className={[
                    "rounded-xl border px-4 py-3 text-sm",
                    status === "ok"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                        : status === "error"
                            ? "border-red-500/20 bg-red-500/10 text-red-200"
                            : "border-white/10 bg-white/5 text-white/70",
                ].join(" ")}
            >
                {status}: {msg}
            </div>
        </div>
    );
}
