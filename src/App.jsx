import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";
import { useOpeningTreeState } from "./hooks/useOpeningTreeState";

export default function App() {
  const state = useOpeningTreeState();

  return (
    <>
      <div className="hidden md:block">
        <OpeningTree state={state} />
      </div>
      <div className="block md:hidden">
        <MobileOpeningTree state={state} />
      </div>
    </>
  );
}
