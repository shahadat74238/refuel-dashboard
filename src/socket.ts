import { io } from "socket.io-client";
import Cookies from "js-cookie";

const URL = "http://localhost:5000";

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

// Helper to connect socket with current token
export const connectSocket = () => {
  const token = Cookies.get("accessToken") || Cookies.get("resetToken");
  if (token && !socket.connected) {
    socket.auth = { token };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket Disconnected");
  }
};