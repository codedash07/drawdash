import { redirect, ActionFunction } from "@remix-run/node";
import { db } from "../utils/db.server";
import { requireUserId } from "../utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const drawingData = await db.drawing.create({
    data: {
      creatorId: userId,
      name: "New Drawing",
    },
  });

  return redirect("/drawing/" + drawingData.id, { status: 303 });
};
