import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./Context/UserContext.jsx";
import CaptainContext from "./Context/CaptainContext.jsx";
import SocketProvider from "./Context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </StrictMode>
);
