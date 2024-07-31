import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { App as AntdApp } from "antd";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <AntdApp>
        <App />
      </AntdApp>
    </UserProvider>
  </React.StrictMode>
);
