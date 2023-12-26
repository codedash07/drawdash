import type { MetaFunction } from "@remix-run/node";

import Draw from "../Draw.client";
import useHydrate from "../hooks/hydrating";

export const meta: MetaFunction = () => {
  return [
    { title: "Drawdash" },
    { name: "description", content: "Welcome to Drawdash!" },
  ];
};

export default function Index() {
  const isHydrated = useHydrate();

  return isHydrated ? <Draw /> : <div>Loading...</div>;
}
