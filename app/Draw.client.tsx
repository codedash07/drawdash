import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

function Draw() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw />
    </div>
  );
}

export default Draw;
