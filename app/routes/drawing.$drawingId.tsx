import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { db } from "../utils/db.server";
import { requireUserId } from "../utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  const drawings = await db.drawing.findUniqueOrThrow({
    where: {
      id: params.drawingId,
      creatorId: userId,
    },
  });

  return json({
    drawings,
  });
};

const Drawing = () => {
  const { drawingId } = useParams();
  const data = useLoaderData<typeof loader>();

  console.log("#### data", data);

  return (
    <div>
      <h1>Drawing {drawingId}</h1>
      {/* Add your drawing logic here */}
    </div>
  );
};

export default Drawing;
