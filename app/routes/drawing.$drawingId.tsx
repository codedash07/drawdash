import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";
import { requireUserId } from "../utils/session.server";
import Draw from "../components/Draw.client";
import useHydrate from "../hooks/hydrating";

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

  return isHydrated ? <Draw drawingJson={data.drawings.json} /> : null;
};

export default Drawing;
