import { useParams } from "@remix-run/react";

const Drawing = () => {
  const { drawingId } = useParams();

  return (
    <div>
      <h1>Drawing {drawingId}</h1>
      {/* Add your drawing logic here */}
    </div>
  );
};

export default Drawing;
