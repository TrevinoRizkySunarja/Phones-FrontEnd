import { apiFetch } from "./client.js";

export function listPhones({ q = "", brand = "", page = 1, limit = 6 } = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (brand) params.set("brand", brand);
    if (limit) params.set("limit", String(limit));
    if (page) params.set("page", String(page));
    return apiFetch(`/phones?${params.toString()}`, { method: "GET" });
}

export function getPhone(id) {
    return apiFetch(`/phones/${id}`, { method: "GET" });
}

export function createPhone(payload) {
    return apiFetch(`/phones`, { method: "POST", body: JSON.stringify(payload) });
}

export function updatePhone(id, payload) {
    return apiFetch(`/phones/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export function deletePhone(id) {
    return apiFetch(`/phones/${id}`, { method: "DELETE" });
}

// PATCH bookmark/like/etc
export function patchPhone(id, partial) {
    return apiFetch(`/phones/${id}`, { method: "PATCH", body: JSON.stringify(partial) });
}
