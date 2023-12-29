import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";
import { requireUserId } from "../utils/session.server";
import Draw from "../components/Draw.client";
import useHydrate from "../hooks/hydrating";

export const meta: MetaFunction = () => {
  return [
    { title: "Drawing | Drawdash" },
    { name: "description", content: "Drawing!" },
  ];
};

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
  const data = useLoaderData<typeof loader>();

  const isHydrated = useHydrate();

  const handleSaveDrawing = async (stringifiedSnapshot: string) => {
    console.log("#### stringifiedSnapshot", stringifiedSnapshot);
  };

  return isHydrated ? (
    <Draw
      drawingJson={data.drawings.json}
      handleSaveDrawing={handleSaveDrawing}
    />
  ) : null;
};

export default Drawing;
