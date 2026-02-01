// src/api/http.js
export function getBaseUrl() {
    return import.meta.env.VITE_API_BASE_URL || "http://145.24.237.21:8001";
}

export function getToken() {
    return localStorage.getItem("coolphones_token");
}

export function setToken(token) {
    if (!token) localStorage.removeItem("coolphones_token");
    else localStorage.setItem("coolphones_token", token);
}

export async function request(path, options = {}) {
    const baseUrl = getBaseUrl();
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

    const headers = new Headers(options.headers || {});
    // Basiseis: alleen JSON ophalen -> Accept header afdwingen
    if (!headers.has("Accept")) headers.set("Accept", "application/json");

    const token = getToken();
    if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, { ...options, headers });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!res.ok) {
        const errBody = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");
        const message =
            (errBody && (errBody.error || errBody.message)) ||
            (typeof errBody === "string" && errBody) ||
            `HTTP ${res.status}`;
        const error = new Error(message);
        error.status = res.status;
        error.body = errBody;
        throw error;
    }

    if (res.status === 204) return null;
    return isJson ? res.json() : res.text();
}
