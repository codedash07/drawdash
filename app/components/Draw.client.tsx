import { memo, useEffect, useState } from "react";
import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
// import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

const ListenerComponent = ({
  handleSaveDrawing,
}: {
  handleSaveDrawing: (stringifiedSnapshot: string) => void;
}) => {
  const editor = useEditor();

  useEffect(() => {
    console.log("mounting");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveDrawing = throttle((snapshot: any) => {
      const stringified = JSON.stringify(snapshot);
      handleSaveDrawing(stringified);
    }, 2000);

    const removeListener = editor.store.listen(() => {
      const snapshot = editor.store.getSnapshot();
      saveDrawing(snapshot);
    });

    return () => {
      console.log("unmounting");
      removeListener();
      saveDrawing.cancel();
    };
  }, [editor.store, handleSaveDrawing]);

  return null;
};

const Listener = memo(ListenerComponent);

function Draw({
  drawingJson,
  handleSaveDrawing,
}: {
  drawingJson?: string;
  handleSaveDrawing: (stringifiedSnapshot: string) => void;
}) {
  const [store] = useState(() => {
    // Create the store
    const newStore = createTLStore({
      shapeUtils: defaultShapeUtils,
    });

    if (drawingJson) {
      const snapshot =
        typeof drawingJson === "string" ? JSON.parse(drawingJson) : drawingJson;

      // Load the snapshot
      newStore.loadSnapshot(snapshot);
    }

    return newStore;
  });

  return (
    <div className="fixed inset-0">
      <Tldraw store={store}>
        <Listener handleSaveDrawing={handleSaveDrawing} />
      </Tldraw>
    </div>
  );
}

export default Draw;
