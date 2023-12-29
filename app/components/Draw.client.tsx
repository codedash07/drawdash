import { useEffect, useState } from "react";
import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import debounce from "lodash.debounce";
import { initialDrawingJson } from "../utils/constants";

const ListenerComponent = ({
  handleSaveDrawing,
}: {
  handleSaveDrawing: (stringifiedSnapshot: string) => void;
}) => {
  const editor = useEditor();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveDrawingWithDebounce = debounce((snapshot: any) => {
      const stringified = JSON.stringify(snapshot);
      handleSaveDrawing(stringified);
    }, 1000);

    editor.store.listen(() => {
      const snapshot = editor.store.getSnapshot();
      saveDrawingWithDebounce(snapshot);
    });

    return () => {
      saveDrawingWithDebounce.cancel();
    };
  }, [editor.store, handleSaveDrawing]);

  return null;
};

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
        <ListenerComponent handleSaveDrawing={handleSaveDrawing} />
      </Tldraw>
    </div>
  );
}

export default Draw;
