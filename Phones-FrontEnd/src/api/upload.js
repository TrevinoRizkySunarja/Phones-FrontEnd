import { apiFetch } from "./client.js";

export function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);

    return apiFetch(`/upload`, {
        method: "POST",
        body: fd,
        // Content-Type niet zetten bij FormData
        headers: { Accept: "application/json" },
    });
}
