import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Root from "./Root";
import "./index.css";

const container = document.getElementById("root");

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <Root />
    </StrictMode>,
  );
} else {
  createRoot(container).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
}
