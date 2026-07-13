
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";
import { useEffect } from "react";
import socket from "./socket/socket";
import { SidebarProvider } from "./context/SidebarContext";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
function SocketInitializer({ children }) {
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("🟢 Connected:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>

          <SocketInitializer>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  background: "#1f2937",
                  color: "#fff",
                },
              }}
            />
          </SocketInitializer>

        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  
);