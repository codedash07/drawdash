import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { initialDrawingJson } from "../utils/constants";

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

function Draw({ drawingJson }: { drawingJson?: string }) {
  const [store] = useState(() => {
    // Create the store
    const newStore = createTLStore({
      shapeUtils: defaultShapeUtils,
    });

    const snapshot = drawingJson
      ? typeof drawingJson === "string"
        ? JSON.parse(drawingJson)
        : drawingJson
      : initialDrawingJson;

    // Load the snapshot
    newStore.loadSnapshot(snapshot);

    return newStore;
  });

  return (
    <div className="fixed inset-0">
      <Tldraw store={store}>
        <ListenerComponent />
      </Tldraw>
    </div>
  );
}

export default Draw;
