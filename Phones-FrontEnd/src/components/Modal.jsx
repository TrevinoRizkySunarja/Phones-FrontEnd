// src/components/Modal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Modal({ title, children, closeTo = "/phones" }) {
    const nav = useNavigate();

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape") nav(closeTo);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [nav, closeTo]);

    return createPortal(
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => nav(closeTo)}
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-slate-200">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                        <button
                            onClick={() => nav(closeTo)}
                            className="px-3 py-2 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 transition"
                        >
                            Close
                        </button>
                    </div>
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </div>,
        document.body
    );
}
