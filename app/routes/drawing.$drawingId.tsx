import { useCallback } from "react";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
  redirect,
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
  console.log("action drawing");
  const userId = await requireUserId(request);
  const drawingId = params.drawingId;

  const data = {
    ...Object.fromEntries(await request.formData()),
  };

  await db.drawing.update({
    where: {
      id: drawingId,
      creatorId: userId,
    },
    data: {
      content: data.stringifiedSnapshot as string,
    },
  });

  return json({
    message: "Drawing saved!",
  });
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  const drawings = await db.drawing.findUnique({
    where: {
      id: params.drawingId,
      creatorId: userId,
    },
  });

  if (!drawings) {
    return redirect("/");
  }

  return json({
    drawings,
  });
};

const Drawing = () => {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const isHydrated = useHydrate();

  const handleSaveDrawing = useCallback(
    async (stringifiedSnapshot: string) => {
      console.log("handleSaveDrawing");
      submit({ stringifiedSnapshot }, { method: "post" });
    },
    [submit]
  );

  return isHydrated ? (
    <Draw
      drawingJson={data.drawings.content}
      handleSaveDrawing={handleSaveDrawing}
    />
  ) : null;
};

export default Drawing;
