import io from "socket.io-client";
import { ngrok } from "@/components/input_nodes_edge";

const socket = io(ngrok, {
  transports: ["websocket"], // Ensure WebSocket is used
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});

// Set up event listeners
socket.on("connect", () => {
  console.log("✅ Connected to WebSocket server");
});

// socket.on("node_update", (data: any) => {
//   console.log("📩 Node Update:", data);
// });

socket.on("disconnect", () => {
  console.warn("⚠️ WebSocket Disconnected. Reconnecting...");
});

socket.on("connect_error", (error :unknown) => {
  console.error("\ud83d\udd34 WebSocket Connection Error:", error);
});

// socket.on("log_update", (data: { log: string }) => {
//   // console.log("Server log:", data.log);
//   // Update your UI with these logs
//   // For example, append to a div or update a state variable
// });

// Export the socket instance
export default socket;
