import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";
import { useIsMobile } from "./hooks/useIsMobile";
import { useOpeningTreeState } from "./hooks/useOpeningTreeState";

export default function App() {
  const state = useOpeningTreeState();
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileOpeningTree state={state} />
  ) : (
    <OpeningTree state={state} />
  );
}
