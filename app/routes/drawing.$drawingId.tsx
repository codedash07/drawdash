import React from "react";

interface DrawingProps {
  drawingId: string;
}

const Drawing: React.FC<DrawingProps> = ({ drawingId }) => {
  return (
    <div>
      <h1>Drawing {drawingId}</h1>
      {/* Add your drawing logic here */}
    </div>
  );
};

export default Drawing;
