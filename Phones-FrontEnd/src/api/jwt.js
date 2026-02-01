// src/api/jwt.js
export function decodeJwt(token) {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = parts[1];

        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        const json = atob(padded);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function isJwtExpired(token) {
    const decoded = decodeJwt(token);
    if (!decoded || !decoded.exp) return false; // exp ontbreekt => niet afdwingen
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now;
}
