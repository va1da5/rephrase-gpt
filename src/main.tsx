import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StyleProvider } from "@ant-design/cssinjs";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </React.StrictMode>
);

document.addEventListener("copy", (event: ClipboardEvent) => {
  const selection = document.getSelection();
  if (!selection) return;

  event?.clipboardData?.setData("text/plain", selection.toString());
  event.preventDefault();
});
