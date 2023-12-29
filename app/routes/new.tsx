import { redirect, ActionFunction } from "@remix-run/node";
import { db } from "../utils/db.server";
import { requireUserId } from "../utils/session.server";
import { initialDrawingJson } from "../utils/constants";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const drawingData = await db.drawing.create({
    data: {
      creatorId: userId,
      name: "New Drawing",
      content: JSON.stringify(initialDrawingJson),
    },
  });

  return redirect("/drawing/" + drawingData.id, { status: 303 });
};
