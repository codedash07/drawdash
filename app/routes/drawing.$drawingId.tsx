import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
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

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const drawingId = params.drawingId;

  const data = {
    ...Object.fromEntries(await request.formData()),
  };

  console.log("#### userId", userId);
  console.log("#### data", data);

  await db.drawing.update({
    where: {
      id: drawingId,
      creatorId: userId,
    },
    data: {
      content: JSON.stringify(data.stringifiedSnapshot),
    },
  });

  return json({
    message: "Drawing saved!",
  });
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
  const submit = useSubmit();

  const isHydrated = useHydrate();

  const handleSaveDrawing = async (stringifiedSnapshot: string) => {
    submit({ stringifiedSnapshot }, { method: "post" });
  };

  console.log("#### data.drawings.content", data.drawings.content);

  return isHydrated ? (
    <Draw
      drawingJson={data.drawings.content}
      handleSaveDrawing={handleSaveDrawing}
    />
  ) : null;
};

export default Drawing;
