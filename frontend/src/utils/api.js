const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

export const authFetch = async (url, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || "Request failed");
  }

  return res.json();
};

export const loginApi = (payload) =>
  authFetch("/user/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const signupApi = (payload) =>
  authFetch("/user/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getContactsApi = (token) =>
  authFetch("/chat/contacts", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMessagesApi = (contactId, token) =>
  authFetch(`/chat/messages/${contactId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

export const sendMessageApi = (body, token) =>
  authFetch("/chat/messages", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
