import App from "./App";
import { TooltipProvider } from "./components/ui/Tooltip";

export default function Root() {
  return (
    <TooltipProvider>
      <App />
    </TooltipProvider>
  );
}
