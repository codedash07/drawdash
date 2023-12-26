import { useEffect, useState } from "react";

let isHydrating = true;

const useHydrate = () => {
  const [isHydrated, setIsHydrated] = useState(!isHydrating);

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  return isHydrated;
};

export default useHydrate;
