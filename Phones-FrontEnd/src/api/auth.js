import { apiFetch } from "./client.js";

// Backend verwacht Basic in Authorization header en geeft JWT terug
export async function loginBasic(username, password) {
    const basic = btoa(`${username}:${password}`);
    return apiFetch(`/login`, {
        method: "POST",
        headers: { Authorization: `Basic ${basic}` },
    });
}

export function logout() {
    localStorage.removeItem("coolphones_jwt");
}
