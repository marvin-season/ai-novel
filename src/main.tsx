import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import './init.js'

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>,
);
