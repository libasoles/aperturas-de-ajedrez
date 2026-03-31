import { useEffect, useState } from "react";
import MobileOpeningTree from "./components/MobileOpeningTree";
import OpeningTree from "./components/OpeningTree";

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();

  if (!isMobile) return <OpeningTree />;

  return <MobileOpeningTree />;
}
