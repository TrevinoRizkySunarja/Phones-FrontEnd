import React, { createContext, useContext, useMemo, useState } from "react";
import {
    listPhones,
    getPhone,
    createPhone,
    updatePhone,
    deletePhone,
    patchPhone,
} from "../api/phones.js";

const PhonesContext = createContext(null);

export function PhonesProvider({ children }) {
    const [items, setItems] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadCollection(params) {
        setLoading(true);
        setError("");
        try {
            const { data } = await listPhones(params);

            // verwacht { items, pagination? }
            setItems(Array.isArray(data?.items) ? data.items : []);
            setPagination(data?.pagination || null);
        } catch (e) {
            setError(e.message || "Failed to load collection");
            setItems([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }

    async function loadDetail(id) {
        const { data } = await getPhone(id);
        return data;
    }

    async function createOne(payload) {
        const { data } = await createPhone(payload);
        return data;
    }

    async function updateOne(id, payload) {
        const { data } = await updatePhone(id, payload);
        return data;
    }

    async function removeOne(id) {
        await deletePhone(id);
    }

    async function toggleBookmark(id, nextValue) {
        const { data } = await patchPhone(id, { hasBookmark: nextValue });
        return data;
    }

    const value = useMemo(
        () => ({
            items,
            pagination,
            loading,
            error,
            loadCollection,
            loadDetail,
            createOne,
            updateOne,
            removeOne,
            toggleBookmark,
        }),
        [items, pagination, loading, error]
    );

    return <PhonesContext.Provider value={value}>{children}</PhonesContext.Provider>;
}

export function usePhones() {
    const ctx = useContext(PhonesContext);
    if (!ctx) throw new Error("usePhones must be used within PhonesProvider");
    return ctx;
}
