import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";
import {
  applyLocaleRedirectForTreeConfigs,
  resolveTreeConfigFromPathname,
} from "./data/treeConfigs";
import { useIsMobile } from "./hooks/useIsMobile";
import { useOpeningTreeState } from "./hooks/useOpeningTreeState";

export default function App() {
  applyLocaleRedirectForTreeConfigs();
  const config = resolveTreeConfigFromPathname(
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const state = useOpeningTreeState(config);
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileOpeningTree state={state} />
  ) : (
    <OpeningTree state={state} />
  );
}
