import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// document.addEventListener("copy", (event: ClipboardEvent) => {
//   const selection = document.getSelection();
//   if (!selection) return;

//   event?.clipboardData?.setData("text/plain", selection.toString());
//   event.preventDefault();
// });
