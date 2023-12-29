import {
  TLStoreWithStatus,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { initialDrawingJson } from "../utils/constants";

const getRemoteSnapshot = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return initialDrawingJson;
};

const ListenerComponent = () => {
  const editor = useEditor();

  useEffect(() => {
    editor.store.listen(() => {
      const snapshot = editor.store.getSnapshot();
      const stringified = JSON.stringify(snapshot);
      console.log("#### stringified", stringified);
    });
  }, [editor.store]);

  return null;
};

function Draw() {
  const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    async function loadRemoteSnapshot() {
      // Get the snapshot
      const snapshot = await getRemoteSnapshot();
      if (cancelled) return;

      // Create the store
      const newStore = createTLStore({
        shapeUtils: defaultShapeUtils,
      });

      // Load the snapshot
      newStore.loadSnapshot(snapshot);

      // Update the store with status
      setStoreWithStatus({
        store: newStore,
        status: "synced-remote",
        connectionStatus: "online",
      });
    }

    loadRemoteSnapshot();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <Tldraw store={storeWithStatus}>
        <ListenerComponent />
      </Tldraw>
    </div>
  );
}

export default Draw;
