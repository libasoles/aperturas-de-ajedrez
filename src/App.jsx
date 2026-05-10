import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";
import PlayerExplorerPage from "./components/PlayerExplorerPage";
import { resolvePlayerRoute } from "./data/players";
import {
  applyLocaleRedirectForTreeConfigs,
  resolveTreeConfigFromPathname,
} from "./data/treeConfigs";
import { useIsMobile } from "./hooks/useIsMobile";
import { useOpeningTreeState } from "./hooks/useOpeningTreeState";

function OpeningApp({ pathname }) {
  applyLocaleRedirectForTreeConfigs();
  const config = resolveTreeConfigFromPathname(pathname);
  const state = useOpeningTreeState(config);
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileOpeningTree state={state} />
  ) : (
    <OpeningTree state={state} />
  );
}

export default function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const playerRoute = resolvePlayerRoute(pathname);
  return playerRoute ? (
    <PlayerExplorerPage
      player={playerRoute.player}
      locale={playerRoute.locale}
    />
  ) : (
    <OpeningApp pathname={pathname} />
  );
}
