import { useEffect, useState } from "react";
import MobileGate from "./components/MobileGate";
import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();

  if (!isMobile) return <OpeningTree />;

  return (
    <MobileGate>
      <MobileOpeningTree />
    </MobileGate>
  );
}
