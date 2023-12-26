import { Suspense } from "react";
import type { MetaFunction } from "@remix-run/node";

import Draw from "../Draw.client";

// import styles from "../index.css";

// export const links = [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Draw />
    </Suspense>
  );
}
