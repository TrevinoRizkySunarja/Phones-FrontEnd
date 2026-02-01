// src/api/coolphonesApi.js
const BASE = "http://145.24.237.21:8001";

export function getToken() {
    return localStorage.getItem("coolphones_token");
}
export function setToken(token) {
    localStorage.setItem("coolphones_token", token);
}
export function clearToken() {
    localStorage.removeItem("coolphones_token");
}

function bearerHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseJsonOrText(res) {
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("application/json")) {
        try {
            return await res.json();
        } catch {
            return null;
        }
    }
    try {
        return await res.text();
    } catch {
        return null;
    }
}

async function request(path, { method = "GET", headers = {}, body = undefined } = {}) {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            Accept: "application/json",
            ...headers,
        },
        body,
    });

    // 304 can have no body; still ok
    if (res.status === 304) {
        return { res, data: null };
    }

    const data = await parseJsonOrText(res);

    if (!res.ok) {
        const msg =
            (data && typeof data === "object" && data.error) ||
            (typeof data === "string" && data) ||
            `HTTP ${res.status}`;
        const err = new Error(msg);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return { res, data };
}

/* ===== Phones ===== */

export async function getPhones({ q = "", brand = "", page = "", limit = "" } = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (brand) params.set("brand", brand);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));

    const qs = params.toString();
    const { data } = await request(`/phones${qs ? `?${qs}` : ""}`);
    return data; // { items, _links, pagination? }
}

export async function getPhone(id, { ifModifiedSince = "" } = {}) {
    const headers = {};
    if (ifModifiedSince) headers["If-Modified-Since"] = ifModifiedSince;

    const { res, data } = await request(`/phones/${id}`, { headers });
    return {
        status: res.status,
        lastModified: res.headers.get("last-modified") || "",
        phone: data,
    };
}

export async function createPhone(payload) {
    const { data } = await request(`/phones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return data;
}

export async function putPhone(id, payload) {
    const { data } = await request(`/phones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return data;
}

export async function patchPhone(id, payload) {
    const { data } = await request(`/phones/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return data;
}

// POST overload: sends PATCH by override header (extra requirement)
export async function patchPhonePostOverload(id, payload) {
    const { data } = await request(`/phones/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-HTTP-Method-Override": "PATCH",
        },
        body: JSON.stringify(payload),
    });
    return data;
}

export async function deletePhone(id) {
    await request(`/phones/${id}`, { method: "DELETE" });
}

/* ===== Auth / Protected ===== */

export async function loginBasic(username, password) {
    const basic = btoa(`${username}:${password}`);

    const { data } = await request(`/login`, {
        method: "POST",
        headers: { Authorization: `Basic ${basic}` },
    });

    // adjust if your backend returns token differently
    if (!data || !data.token) {
        throw new Error("Login response missing token");
    }

    setToken(data.token);
    return data.token;
}

export async function protectedPing() {
    const { data } = await request(`/protected/ping`, {
        headers: { ...bearerHeaders() },
    });
    return data;
}

/* ===== Upload ===== */

export async function uploadFile(file) {
    const form = new FormData();
    form.append("file", file);

    const { data } = await request(`/upload`, {
        method: "POST",
        headers: {
            ...bearerHeaders(), // remove if your upload is not protected
        },
        body: form,
    });

    // adjust if backend returns different shape
    if (!data || !data.imageUrl) {
        throw new Error("Upload response missing imageUrl");
    }
    return data.imageUrl;
}
