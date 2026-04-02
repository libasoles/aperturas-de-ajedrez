import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";
import { useIsMobile } from "./hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  if (!isMobile) return <OpeningTree />;

  return <MobileOpeningTree />;
}
