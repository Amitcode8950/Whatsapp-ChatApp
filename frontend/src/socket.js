import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

export const createSocket = (token) => {
  if (!token) return null;

  return io(API_URL, {
    auth: { token },
    transports: ["websocket"],
  });
};
