import React, { useEffect } from "react";

export default function Modal({ title, children, onClose }) {
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose?.();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />
            <div className="absolute inset-0 grid place-items-center p-4">
                <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <div className="text-white font-semibold">{title}</div>
                        <button
                            onClick={onClose}
                            className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </div>
    );
}
