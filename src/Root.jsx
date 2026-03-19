import { I18nextProvider } from "react-i18next";
import App from "./App";
import i18n from "./i18n";
import { TooltipProvider } from "./components/ui/Tooltip";

export default function Root() {
  return (
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </I18nextProvider>
  );
}
