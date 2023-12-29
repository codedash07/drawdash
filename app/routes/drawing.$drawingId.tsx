interface DrawingProps {
  drawingId: string;
}

const Drawing = ({ drawingId }: DrawingProps) => {
  return (
    <div>
      <h1>Drawing {drawingId}</h1>
      {/* Add your drawing logic here */}
    </div>
  );
};

export default Drawing;
