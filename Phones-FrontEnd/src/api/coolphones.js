// src/api/coolphones.js
import { request } from "./http.js";

export function listPhones({ q = "", brand = "" } = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (brand) params.set("brand", brand);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return request(`/phones${qs}`, { method: "GET" });
}

export function getPhone(id, { ifModifiedSince } = {}) {
    const headers = {};
    if (ifModifiedSince) headers["If-Modified-Since"] = ifModifiedSince;
    return request(`/phones/${id}`, { method: "GET", headers });
}

export function createPhone(payload) {
    return request(`/phones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

export function updatePhonePut(id, payload) {
    return request(`/phones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

// Extra onderdeel: PATCH of POST-overload
export function patchPhone(id, patch) {
    return request(`/phones/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
    });
}

// Als jouw server PATCH blokkeert in sommige situaties:
// POST overload => /phones/:id?_method=PATCH
export function patchPhoneViaPostOverload(id, patch) {
    return request(`/phones/${id}?_method=PATCH`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
    });
}

export function deletePhone(id) {
    return request(`/phones/${id}`, { method: "DELETE" });
}

export function seedPhones(amount = 10) {
    return request(`/phones/seed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });
}

// Upload endpoint (multipart/form-data)
export function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);

    // GEEN Content-Type header zetten bij FormData
    return request(`/upload`, {
        method: "POST",
        body: fd,
    });
}

// Login endpoint (Basic -> JWT)
export function loginBasic(username, password) {
    const token = btoa(`${username}:${password}`);
    return request(`/login`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${token}`,
        },
    });
}

// Checker endpoint (niet collectie/detail): /protected/ping
export function protectedPing() {
    return request(`/protected/ping`, { method: "GET" });
}
