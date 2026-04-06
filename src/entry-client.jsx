import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { initAnalytics } from "./lib/analytics";
import Root from "./Root";
import "./index.css";

const container = document.getElementById("root");

initAnalytics();

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
