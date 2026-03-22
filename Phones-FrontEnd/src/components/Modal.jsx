import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children }) {
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose?.();
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/70"
                onClick={() => onClose?.()}
            />
            <div className="absolute left-1/2 top-1/2 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <div className="text-sm font-semibold text-zinc-100">{title}</div>
                        <button
                            onClick={() => onClose?.()}
                            className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
                        >
                            Close
                        </button>
                    </div>
                    <div className="px-5 py-5">{children}</div>
                </div>
            </div>
        </div>,
        document.body
    );
}
