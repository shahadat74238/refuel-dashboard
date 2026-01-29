import { useEffect } from "react";
import { connectSocket, disconnectSocket, socket } from "../socket";
import Cookies from "js-cookie";

export const SocketInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // 1. Initial connection check
    const token = Cookies.get("accessToken") || Cookies.get("resetToken");
    if (token) {
      connectSocket();
    }

    // --- NEW: Connection Event Listeners ---

    socket.on("connect", () => {
      console.log("✅ Socket Connected successfully! ID:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket Disconnected. Reason:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Socket Connection Error:", err.message);
    });

    // 3. Cleanup on App unmount
    return () => {
      // Remove all listeners to prevent memory leaks/duplicate logs
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      disconnectSocket();
    };
  }, []);

  return <>{children}</>;
};