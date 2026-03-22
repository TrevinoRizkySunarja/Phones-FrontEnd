const API_BASE =
    import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "http://145.24.237.21:8001";

function getToken() {
    return localStorage.getItem("coolphones_jwt") || "";
}

export async function apiFetch(path, { headers, ...options } = {}) {
    const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

    const mergedHeaders = {
        Accept: "application/json",
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(headers || {}),
    };

    const token = getToken();
    if (token) mergedHeaders.Authorization = `Bearer ${token}`;

    const res = await fetch(url, { ...options, headers: mergedHeaders });

    // 204: no content
    if (res.status === 204) return { ok: true, status: 204, data: null };

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

    if (!res.ok) {
        const msg =
            (data && typeof data === "object" && (data.error || data.message)) ||
            (typeof data === "string" && data) ||
            `HTTP ${res.status}`;
        const err = new Error(msg);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return { ok: true, status: res.status, data };
}

export function buildApiBase() {
    return API_BASE;
}
